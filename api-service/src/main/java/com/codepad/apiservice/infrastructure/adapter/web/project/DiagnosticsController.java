package com.codepad.apiservice.infrastructure.adapter.web.project;

import com.codepad.apiservice.core.ManageProjectUseCase;
import com.codepad.apiservice.core.Project;
import com.codepad.apiservice.run.WorkerClient;
import com.codepad.apiservice.run.dto.DiagnosticsRequest;
import com.codepad.apiservice.run.dto.DiagnosticsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/projects/{projectId}/diagnostics")
@RequiredArgsConstructor
public class DiagnosticsController {
    private final ManageProjectUseCase manageProjectUseCase;
    private final WorkerClient workerClient;

    @PostMapping
    public ResponseEntity<DiagnosticsResponse> check(@PathVariable UUID projectId, @RequestBody DiagnosticsRequest req) {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        Project project = manageProjectUseCase.requireOwnedProject(UUID.fromString(auth.getName()), projectId);
        return ResponseEntity.ok(workerClient.getDiagnostics(projectId, project.getLanguage(), req));
    }
}
