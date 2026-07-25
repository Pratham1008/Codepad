package com.codepad.apiservice.infrastructure.adapter.persistence.project;

import com.codepad.apiservice.core.Project;
import com.codepad.apiservice.core.ProjectRepositoryPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class ProjectJpaAdapter implements ProjectRepositoryPort {
    private final SpringDataProjectRepository jpaRepository;

    @Override
    public Project save(Project project) { return jpaRepository.save(project); }
    @Override
    public Optional<Project> findById(UUID projectId) { return jpaRepository.findById(projectId); }
    @Override
    public List<Project> findByOwnerId(UUID ownerId) { return jpaRepository.findByOwner_UserId(ownerId); }
    @Override
    public org.springframework.data.domain.Page<Project> findByOwnerId(UUID ownerId, org.springframework.data.domain.Pageable pageable) { return jpaRepository.findByOwner_UserId(ownerId, pageable); }
    @Override
    public void deleteById(UUID projectId) { jpaRepository.deleteById(projectId); }
}
