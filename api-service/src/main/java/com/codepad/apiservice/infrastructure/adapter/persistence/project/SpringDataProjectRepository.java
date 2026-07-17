package com.codepad.apiservice.infrastructure.adapter.persistence.project;

import com.codepad.apiservice.core.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface SpringDataProjectRepository extends JpaRepository<Project, UUID> {
    List<Project> findByOwner_UserId(UUID ownerId);
}
