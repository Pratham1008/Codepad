package com.codepad.apiservice.core;

import org.springframework.data.domain.Page;
import java.util.Optional;
import java.util.UUID;

public interface CodeSnippetRepositoryPort {
    CodeSnippet save(CodeSnippet snippet);
    Optional<CodeSnippet> findById(UUID id);
    Page<CodeSnippet> findByUserId(UUID userId, int page, int size);
    long countByUserId(UUID userId);
    void delete(CodeSnippet snippet);
    void deleteAllByUserId(UUID userId);
}
