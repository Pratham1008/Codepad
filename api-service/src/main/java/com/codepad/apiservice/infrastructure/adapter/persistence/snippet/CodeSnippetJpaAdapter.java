package com.codepad.apiservice.infrastructure.adapter.persistence.snippet;

import com.codepad.apiservice.core.CodeSnippet;
import com.codepad.apiservice.core.CodeSnippetRepositoryPort;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class CodeSnippetJpaAdapter implements CodeSnippetRepositoryPort {

    private final SpringDataCodeSnippetRepository repository;

    @Override
    public CodeSnippet save(CodeSnippet snippet) {
        return repository.save(snippet);
    }

    @Override
    public Optional<CodeSnippet> findById(UUID id) {
        return repository.findById(id);
    }

    @Override
    public Page<CodeSnippet> findByUserId(UUID userId, int page, int size) {
        return repository.findByUserId(userId, PageRequest.of(page, size));
    }

    @Override
    public long countByUserId(UUID userId) {
        return repository.countByUserId(userId);
    }

    @Override
    public void delete(CodeSnippet snippet) {
        repository.delete(snippet);
    }

    @Override
    public void deleteAllByUserId(UUID userId) {
        repository.deleteAllByUserId(userId);
    }
}
