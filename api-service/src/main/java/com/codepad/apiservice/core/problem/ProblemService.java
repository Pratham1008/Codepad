package com.codepad.apiservice.core.problem;

import com.codepad.apiservice.core.User;
import com.codepad.apiservice.core.UserRepositoryPort;
import com.codepad.apiservice.core.problem.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ProblemService {
    private final ProblemRepository problemRepository;
    private final UserRepositoryPort userRepositoryPort;
    private final TestCaseRepository testCaseRepository;
    private final CacheManager cacheManager;

    private void evictProblemCache(String slug) {
        if (slug != null && cacheManager.getCache("problems") != null) {
            cacheManager.getCache("problems").evict(slug);
        }
    }

    public Page<ProblemSummaryDto> list(String difficulty, Pageable pageable) {
        Page<Problem> problems;
        if (difficulty != null) {
            problems = problemRepository.findByDifficultyAndIsPublishedTrue(difficulty.toUpperCase(), pageable);
        } else {
            problems = problemRepository.findByIsPublishedTrue(pageable);
        }
        return problems.map(this::toSummaryDto);
    }

    @Cacheable(value = "problems", key = "#slug")
    public ProblemDetailDto getBySlug(String slug) {
        Problem problem = problemRepository.findBySlug(slug)
                .orElseThrow(() -> new IllegalArgumentException("Problem not found"));
        return toDetailDto(problem);
    }

    public ProblemDetailDto create(UUID userId, CreateProblemRequest req) {
        User user = userRepositoryPort.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Problem problem = Problem.builder()
                .slug(req.slug())
                .title(req.title())
                .description(req.description())
                .difficulty(req.difficulty().toUpperCase())
                .timeLimitMs(req.timeLimitMs())
                .memoryLimitKb(req.memoryLimitKb())
                .starterCode(req.starterCode() != null ? new HashMap<>(req.starterCode()) : new HashMap<>())
                .isPublished(req.isPublished())
                .createdBy(user)
                .tags(req.tags() != null ? req.tags() : new java.util.ArrayList<>())
                .build();

        problem = problemRepository.save(problem);

        if (req.testCases() != null) {
            for (int i = 0; i < req.testCases().size(); i++) {
                TestCaseDto tcReq = req.testCases().get(i);
                TestCase tc = TestCase.builder()
                        .problem(problem)
                        .input(tcReq.input())
                        .expectedOutput(tcReq.expectedOutput())
                        .isSample(tcReq.isSample())
                        .explanation(tcReq.explanation())
                        .orderIndex(i)
                        .build();
                testCaseRepository.save(tc);
            }
        }

        return toDetailDto(problem);
    }

    public ProblemDetailDto update(UUID problemId, UpdateProblemRequest req) {
        Problem problem = problemRepository.findById(problemId)
                .orElseThrow(() -> new IllegalArgumentException("Problem not found"));

        String oldSlug = problem.getSlug();

        if (req.title() != null) problem.setTitle(req.title());
        if (req.slug() != null) problem.setSlug(req.slug());
        if (req.description() != null) problem.setDescription(req.description());
        if (req.difficulty() != null) problem.setDifficulty(req.difficulty().toUpperCase());
        if (req.timeLimitMs() != null) problem.setTimeLimitMs(req.timeLimitMs());
        if (req.memoryLimitKb() != null) problem.setMemoryLimitKb(req.memoryLimitKb());
        if (req.isPublished() != null) problem.setIsPublished(req.isPublished());
        if (req.tags() != null) problem.setTags(req.tags());
        
        if (req.starterCode() != null) {
            problem.getStarterCode().putAll(req.starterCode());
        }

        if (req.solutionMarkdown() != null) problem.setSolutionMarkdown(req.solutionMarkdown());
        if (req.solutionCode() != null) {
            problem.getSolutionCode().putAll(req.solutionCode());
        }

        // Evict old slug and new slug if changed
        evictProblemCache(oldSlug);
        if (!oldSlug.equals(problem.getSlug())) {
            evictProblemCache(problem.getSlug());
        }

        return toDetailDto(problem);
    }

    public void addTestCase(UUID problemId, AddTestCaseRequest req) {
        Problem problem = problemRepository.findById(problemId)
                .orElseThrow(() -> new IllegalArgumentException("Problem not found"));

        int maxOrder = problem.getTestCases().stream().mapToInt(TestCase::getOrderIndex).max().orElse(-1);

        TestCase tc = TestCase.builder()
                .problem(problem)
                .input(req.input())
                .expectedOutput(req.expectedOutput())
                .isSample(req.isSample())
                .explanation(req.explanation())
                .orderIndex(maxOrder + 1)
                .build();
        testCaseRepository.save(tc);
        evictProblemCache(problem.getSlug());
    }

    private ProblemSummaryDto toSummaryDto(Problem p) {
        return new ProblemSummaryDto(
                p.getProblemId(),
                p.getSlug(),
                p.getTitle(),
                p.getDifficulty(),
                p.getTags() != null ? new java.util.ArrayList<>(p.getTags()) : new java.util.ArrayList<>()
        );
    }

    public ProblemSolutionDto getSolution(UUID problemId) {
        Problem problem = problemRepository.findById(problemId)
                .orElseThrow(() -> new IllegalArgumentException("Problem not found"));
        
        var solutionCode = problem.getSolutionCode() != null ? new HashMap<>(problem.getSolutionCode()) : new HashMap<String, String>();

        return new ProblemSolutionDto(problemId, problem.getSolutionMarkdown(), solutionCode);
    }

    private ProblemDetailDto toDetailDto(Problem p) {
        var starterCode = p.getStarterCode() != null ? new HashMap<>(p.getStarterCode()) : new HashMap<String, String>();

        var samples = p.getTestCases().stream()
                .filter(TestCase::getIsSample)
                .map(tc -> new TestCaseDto(tc.getTestCaseId(), tc.getInput(), tc.getExpectedOutput(), tc.getIsSample(), tc.getExplanation()))
                .collect(Collectors.toList());

        return new ProblemDetailDto(
                p.getProblemId(),
                p.getSlug(),
                p.getTitle(),
                p.getDescription(),
                p.getDifficulty(),
                p.getTimeLimitMs(),
                p.getMemoryLimitKb(),
                p.getTags() != null ? new java.util.ArrayList<>(p.getTags()) : new java.util.ArrayList<>(),
                starterCode,
                samples,
                p.getTestCases() != null ? p.getTestCases().size() : 0
        );
    }
}
