package com.codepad.apiservice.core;

import java.time.LocalDateTime;
import java.util.UUID;

public record ProjectResponse(
        UUID projectId,
        String name,
        String language,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static ProjectResponse from(Project p) {
        return new ProjectResponse(
                p.getProjectId(), p.getName(), p.getLanguage(),
                p.getCreatedAt(), p.getUpdatedAt()
        );
    }
}
