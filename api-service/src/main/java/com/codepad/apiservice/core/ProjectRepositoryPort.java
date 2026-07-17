package com.codepad.apiservice.core;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProjectRepositoryPort {
    Project save(Project project);
    Optional<Project> findById(UUID projectId);
    List<Project> findByOwnerId(UUID ownerId);
    void deleteById(UUID projectId);
}
