package com.codepad.apiservice.core;

import com.codepad.apiservice.core.port.in.dto.SaveSnippetRequest;
import org.springframework.data.domain.Page;

import java.util.UUID;

public interface ManageSnippetUseCase {
    SnippetResponse saveSnippet(UUID userId, SaveSnippetRequest request);
    Page<SnippetResponse> getSnippetHistory(UUID userId, int page, int size);
    SnippetResponse getSnippetById(UUID userId, UUID snippetId);
    SnippetResponse updateSnippet(UUID userId, UUID snippetId, UpdateSnippetRequest request);
    void deleteSnippet(UUID userId, UUID snippetId);
}
