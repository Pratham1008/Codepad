package com.codepad.apiservice.core.usecase;

import com.codepad.apiservice.core.ForbiddenException;
import com.codepad.apiservice.core.LimitExceededException;
import com.codepad.apiservice.core.NotFoundException;
import com.codepad.apiservice.core.CodeSnippet;
import com.codepad.apiservice.core.User;
import com.codepad.apiservice.core.ManageSnippetUseCase;
import com.codepad.apiservice.core.port.in.dto.SaveSnippetRequest;
import com.codepad.apiservice.core.SnippetResponse;
import com.codepad.apiservice.core.UpdateSnippetRequest;
import com.codepad.apiservice.core.CodeSnippetRepositoryPort;
import com.codepad.apiservice.core.UserRepositoryPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class ManageSnippetInteractor implements ManageSnippetUseCase {

    private final CodeSnippetRepositoryPort snippetRepository;
    private final UserRepositoryPort UserRepositoryPort;

    private static final int MAX_SNIPPETS_PER_USER = 500;

    @Override
    @Transactional
    public SnippetResponse saveSnippet(UUID userId, SaveSnippetRequest req) {
        User user = UserRepositoryPort.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        CodeSnippet snippet;
        if (req.snippetId() != null) {
            snippet = snippetRepository.findById(req.snippetId())
                    .orElseThrow(() -> new NotFoundException("Snippet not found"));
            if (!snippet.getUser().getUserId().equals(userId)) {
                throw new ForbiddenException("Not authorized to modify this snippet");
            }
            
            snippet.setLanguage(req.language().toUpperCase());
            snippet.setSourceCode(req.sourceCode());
            snippet.setStdin(req.stdin());
            snippet.setStdout(req.stdout());
            snippet.setStderr(req.stderr());
            snippet.setExitCode(req.exitCode());
            snippet.setExecutionTimeMs(req.executionTimeMs());
            snippet.setMemoryUsageKb(req.memoryUsageKb());
            snippet.setTitle(req.title());
            snippet.setNotes(req.notes());
            snippet.setTags(req.tags() != null && !req.tags().isEmpty() ? String.join(",", req.tags()) : null);
        } else {
            long count = snippetRepository.countByUserId(userId);
            if (count >= MAX_SNIPPETS_PER_USER) {
                throw new LimitExceededException("Snippet limit reached (" + MAX_SNIPPETS_PER_USER + "). Delete some before saving more.");
            }
            snippet = CodeSnippet.builder()
                    .user(user)
                    .language(req.language().toUpperCase())
                    .sourceCode(req.sourceCode())
                    .stdin(req.stdin())
                    .stdout(req.stdout())
                    .stderr(req.stderr())
                    .exitCode(req.exitCode())
                    .executionTimeMs(req.executionTimeMs())
                    .memoryUsageKb(req.memoryUsageKb())
                    .title(req.title())
                    .notes(req.notes())
                    .tags(req.tags() != null && !req.tags().isEmpty() ? String.join(",", req.tags()) : null)
                    .build();
        }

        return toResponse(snippetRepository.save(snippet));
    }

    @Override
    @Transactional(readOnly = true)
    public Page<SnippetResponse> getSnippetHistory(UUID userId, int page, int size) {
        return snippetRepository.findByUserId(userId, page, size).map(this::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public SnippetResponse getSnippetById(UUID userId, UUID snippetId) {
        CodeSnippet snippet = snippetRepository.findById(snippetId)
                .orElseThrow(() -> new NotFoundException("Snippet not found"));
        if (!snippet.getUser().getUserId().equals(userId)) {
            throw new ForbiddenException("Not authorized to access this snippet");
        }
        return toResponse(snippet);
    }

    @Override
    @Transactional
    public SnippetResponse updateSnippet(UUID userId, UUID snippetId, UpdateSnippetRequest req) {
        CodeSnippet snippet = snippetRepository.findById(snippetId)
                .orElseThrow(() -> new NotFoundException("Snippet not found"));
        if (!snippet.getUser().getUserId().equals(userId)) {
            throw new ForbiddenException("Not authorized to modify this snippet");
        }

        if (req.title() != null) snippet.setTitle(req.title().trim().isEmpty() ? null : req.title().trim());
        if (req.notes() != null) snippet.setNotes(req.notes().trim().isEmpty() ? null : req.notes().trim());
        if (req.tags() != null) snippet.setTags(req.tags().isEmpty() ? null : String.join(",", req.tags()));

        return toResponse(snippetRepository.save(snippet));
    }

    @Override
    @Transactional
    public void deleteSnippet(UUID userId, UUID snippetId) {
        CodeSnippet snippet = snippetRepository.findById(snippetId)
                .orElseThrow(() -> new NotFoundException("Snippet not found"));
        if (!snippet.getUser().getUserId().equals(userId)) {
            throw new ForbiddenException("Not authorized to delete this snippet");
        }
        snippetRepository.delete(snippet);
    }

    private SnippetResponse toResponse(CodeSnippet s) {
        List<String> tags = (s.getTags() != null && !s.getTags().isBlank())
                ? Arrays.asList(s.getTags().split(","))
                : List.of();
        return new SnippetResponse(
                s.getSnippetId(), s.getLanguage(), s.getSourceCode(),
                s.getStdin(), s.getStdout(), s.getStderr(), s.getExitCode(),
                s.getExecutionTimeMs(), s.getMemoryUsageKb(),
                s.getTitle(), s.getNotes(), tags,
                s.getCreatedAt(), s.getUpdatedAt()
        );
    }
}
