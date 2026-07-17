package com.codepad.apiservice.infrastructure.adapter.web.project;

import com.codepad.apiservice.core.ManageProjectUseCase;
import com.codepad.apiservice.core.ProjectResponse;
import com.codepad.apiservice.core.UpdateProjectRequest;
import com.codepad.apiservice.core.port.in.dto.CreateProjectRequest;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
@Tag(name = "Projects", description = "Project management")
public class ProjectController {
    private final ManageProjectUseCase manageProjectUseCase;

    private UUID currentUserId() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        assert auth != null;
        return UUID.fromString(auth.getName());
    }

    @PostMapping
    public ResponseEntity<ProjectResponse> create(@Valid @RequestBody CreateProjectRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(manageProjectUseCase.createProject(currentUserId(), req));
    }

    @GetMapping
    public ResponseEntity<List<ProjectResponse>> list() {
        return ResponseEntity.ok(manageProjectUseCase.listProjects(currentUserId()));
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<ProjectResponse> get(@PathVariable UUID projectId) {
        return ResponseEntity.ok(manageProjectUseCase.getProject(currentUserId(), projectId));
    }

    @PatchMapping("/{projectId}")
    public ResponseEntity<ProjectResponse> update(@PathVariable UUID projectId, @RequestBody UpdateProjectRequest req) {
        return ResponseEntity.ok(manageProjectUseCase.updateProject(currentUserId(), projectId, req));
    }

    @DeleteMapping("/{projectId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID projectId) {
        manageProjectUseCase.deleteProject(currentUserId(), projectId);
    }
}
