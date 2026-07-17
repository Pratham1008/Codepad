package com.codepad.apiservice.core.usecase;

import com.codepad.apiservice.core.*;
import com.codepad.apiservice.core.port.in.dto.CreateProjectRequest;
import com.codepad.apiservice.run.WorkerClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ManageProjectInteractor implements ManageProjectUseCase {

    private final ProjectRepositoryPort projectRepository;
    private final UserRepositoryPort userRepository;
    private final WorkerClient workerClient;

    @Override
    @Transactional
    public ProjectResponse createProject(UUID ownerId, CreateProjectRequest req) {
        User owner = userRepository.findById(ownerId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        Project project = Project.builder()
                .owner(owner)
                .name(req.name())
                .language(req.language())
                .build();

        Project saved = projectRepository.save(project);
        workerClient.initProject(saved.getProjectId(), saved.getLanguage());
        return ProjectResponse.from(saved);
    }

    @Override
    public List<ProjectResponse> listProjects(UUID ownerId) {
        return projectRepository.findByOwnerId(ownerId).stream()
                .map(ProjectResponse::from)
                .toList();
    }

    @Override
    public ProjectResponse getProject(UUID ownerId, UUID projectId) {
        return ProjectResponse.from(requireOwnedProject(ownerId, projectId));
    }

    @Override
    @Transactional
    public ProjectResponse updateProject(UUID ownerId, UUID projectId, UpdateProjectRequest req) {
        Project project = requireOwnedProject(ownerId, projectId);
        if (req.name() != null && !req.name().isBlank()) project.setName(req.name());
        return ProjectResponse.from(projectRepository.save(project));
    }

    @Override
    @Transactional
    public void deleteProject(UUID ownerId, UUID projectId) {
        Project project = requireOwnedProject(ownerId, projectId);
        workerClient.deleteProjectFiles(project.getProjectId());
        projectRepository.deleteById(projectId);
    }

    @Override
    public Project requireOwnedProject(UUID ownerId, UUID projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException("Project not found"));
        if (!project.getOwner().getUserId().equals(ownerId)) {
            throw new ForbiddenException("You do not own this project");
        }
        return project;
    }
}
