package com.codepad.workerservice.session;

import java.util.UUID;

public record WorkspaceSessionKey(String value) {

    public static WorkspaceSessionKey forProject(UUID projectId) {
        return new WorkspaceSessionKey("project:" + projectId);
    }

    public static WorkspaceSessionKey forSolve(UUID userId, UUID problemId, String language) {
        return new WorkspaceSessionKey("solve:" + userId + ":" + problemId + ":" + language.toUpperCase());
    }
}
