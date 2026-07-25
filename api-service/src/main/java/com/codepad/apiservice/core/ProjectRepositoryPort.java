package com.codepad.apiservice.core;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProjectRepositoryPort {
    Project save(Project project);
    Optional<Project> findById(UUID projectId);
    List<Project> findByOwnerId(UUID ownerId);
    Page<Project> findByOwnerId(UUID ownerId, Pageable pageable);
    void deleteById(UUID projectId);
}
