package com.codepad.apiservice.core.problem;

import com.codepad.apiservice.core.User;
import com.codepad.apiservice.core.UserRepositoryPort;
import com.codepad.apiservice.core.problem.dto.SolutionUnlockStatus;
import com.codepad.apiservice.core.problem.dto.SubmissionResultDto;
import com.codepad.apiservice.core.problem.dto.SubmissionSummaryDto;
import com.codepad.apiservice.core.problem.dto.TestCaseDto;
import com.codepad.apiservice.run.WorkerClient;
import com.codepad.apiservice.run.dto.JudgeRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class SubmissionService {
    private final SubmissionRepository submissionRepository;
    private final ProblemRepository problemRepository;
    private final UserRepositoryPort userRepositoryPort;
    private final WorkerClient workerClient;
    
    public SolutionUnlockStatus getSolutionStatus(UUID userId, UUID problemId) {
        boolean hasAC = submissionRepository.existsByUser_UserIdAndProblem_ProblemIdAndVerdict(userId, problemId, "AC");
        long failedSubmits = submissionRepository.countByUser_UserIdAndProblem_ProblemIdAndVerdictNot(userId, problemId, "AC");
        boolean unlocked = hasAC || failedSubmits >= 3;
        return new SolutionUnlockStatus(unlocked, unlocked ? 0 : (int) (3 - failedSubmits));
    }

    public SubmissionResultDto runSamples(UUID userId, UUID problemId, String language, String sourceCode) {
        Problem problem = problemRepository.findById(problemId)
                .orElseThrow(() -> new IllegalArgumentException("Problem not found"));

        List<TestCaseDto> samples = problem.getTestCases().stream()
                .filter(TestCase::getIsSample)
                .map(tc -> new TestCaseDto(tc.getTestCaseId(), tc.getInput(), tc.getExpectedOutput(), true, tc.getExplanation()))
                .collect(Collectors.toList());

        if (samples.size() != 3) {
            throw new IllegalStateException("Problem misconfigured: expected 3 sample cases");
        }

        String finalSourceCode = sourceCode;
        if (problem.getSolutionCode() != null && problem.getSolutionCode().containsKey(language)) {
            String template = problem.getSolutionCode().get(language);
            if (template.contains("{{USER_CODE}}")) {
                finalSourceCode = template.replace("{{USER_CODE}}", sourceCode);
            } else {
                finalSourceCode = sourceCode + "\n\n" + template;
            }
        }

        JudgeRequestDto req = new JudgeRequestDto(
                userId,
                problemId,
                language,
                finalSourceCode,
                samples,
                problem.getTimeLimitMs(),
                problem.getMemoryLimitKb()
        );

        return workerClient.judge(req);
    }

    public UUID createPending(UUID userId, UUID problemId, String language, String sourceCode) {
        User user = userRepositoryPort.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Problem problem = problemRepository.findById(problemId)
                .orElseThrow(() -> new IllegalArgumentException("Problem not found"));

        Submission submission = Submission.builder()
                .user(user)
                .problem(problem)
                .language(language)
                .sourceCode(sourceCode)
                .verdict("PENDING")
                .compileError(null)
                .passedCount(0)
                .totalCount(0)
                .maxTimeMs(0)
                .maxMemoryKb(0)
                .build();
        submission = submissionRepository.save(submission);
        return submission.getSubmissionId();
    }

    public SubmissionResultDto judgeAndPersist(UUID submissionId, UUID userId, UUID problemId, String language, String sourceCode) {
        Submission submission = submissionRepository.findById(submissionId)
                .orElseThrow(() -> new IllegalArgumentException("Submission not found"));
        Problem problem = submission.getProblem();

        List<TestCaseDto> allTestCases = problem.getTestCases().stream()
                .map(tc -> new TestCaseDto(tc.getTestCaseId(), tc.getInput(), tc.getExpectedOutput(), tc.getIsSample(), tc.getExplanation()))
                .collect(Collectors.toList());

        String finalSourceCode = sourceCode;
        if (problem.getSolutionCode() != null && problem.getSolutionCode().containsKey(language)) {
            String template = problem.getSolutionCode().get(language);
            if (template.contains("{{USER_CODE}}")) {
                finalSourceCode = template.replace("{{USER_CODE}}", sourceCode);
            } else {
                finalSourceCode = sourceCode + "\n\n" + template;
            }
        }

        JudgeRequestDto req = new JudgeRequestDto(
                userId,
                problemId,
                language,
                finalSourceCode,
                allTestCases,
                problem.getTimeLimitMs(),
                problem.getMemoryLimitKb()
        );

        SubmissionResultDto result = workerClient.judge(req);

        submission.setVerdict(result.verdict());
        submission.setCompileError(result.compileError());
        submission.setPassedCount(result.passedCount());
        submission.setTotalCount(result.totalCount());
        submission.setMaxTimeMs(result.maxTimeMs());
        submission.setMaxMemoryKb(result.maxMemoryKb());

        if (result.results() != null) {
            var results = result.results().stream().map(res -> SubmissionTestResult.builder()
                    .submission(submission)
                    .testCase(problem.getTestCases().stream().filter(t -> t.getTestCaseId().equals(res.testCaseId())).findFirst().orElseThrow())
                    .verdict(res.verdict())
                    .timeMs(res.timeMs())
                    .memoryKb(res.memoryKb())
                    .actualOutput(res.actualOutput())
                    .build()).collect(Collectors.toList());
            submission.getTestResults().clear();
            submission.getTestResults().addAll(results);
        }

        submissionRepository.save(submission);

        return result;
    }

    public Page<SubmissionSummaryDto> history(UUID userId, UUID problemId, Pageable pageable) {
        return submissionRepository.findByUser_UserIdAndProblem_ProblemIdOrderBySubmittedAtDesc(userId, problemId, pageable)
                .map(s -> new SubmissionSummaryDto(
                        s.getSubmissionId(),
                        s.getLanguage(),
                        s.getVerdict(),
                        s.getMaxTimeMs() != null ? s.getMaxTimeMs() : 0,
                        s.getMaxMemoryKb() != null ? s.getMaxMemoryKb() : 0,
                        s.getPassedCount() != null ? s.getPassedCount() : 0,
                        s.getTotalCount() != null ? s.getTotalCount() : 0,
                        s.getSourceCode(),
                        s.getSubmittedAt()
                ));
    }
}
