package com.codepad.apiservice.core;

import com.codepad.apiservice.core.port.in.dto.CreateProjectRequest;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ManageProjectUseCase {
    ProjectResponse createProject(UUID ownerId, CreateProjectRequest req);
    List<ProjectResponse> listProjects(UUID ownerId);
    Page<ProjectResponse> listProjects(UUID ownerId, Pageable pageable);
    ProjectResponse getProject(UUID ownerId, UUID projectId);
    ProjectResponse updateProject(UUID ownerId, UUID projectId, UpdateProjectRequest req);
    void deleteProject(UUID ownerId, UUID projectId);
    Project requireOwnedProject(UUID ownerId, UUID projectId);
}
