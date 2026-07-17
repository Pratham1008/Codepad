package com.codepad.apiservice.infrastructure.adapter.web.project;

import com.codepad.apiservice.core.ManageProjectUseCase;
import com.codepad.apiservice.run.WorkerClient;
import com.codepad.apiservice.run.dto.CreateFileRequest;
import com.codepad.apiservice.run.dto.FileNode;
import com.codepad.apiservice.run.dto.RenameFileRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/projects/{projectId}/files")
@RequiredArgsConstructor
public class ProjectFileController {
    private final ManageProjectUseCase manageProjectUseCase;
    private final WorkerClient workerClient;

    private void requireAccess(UUID projectId) {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        manageProjectUseCase.requireOwnedProject(UUID.fromString(auth.getName()), projectId);
    }

    @GetMapping("/tree")
    public ResponseEntity<FileNode> tree(@PathVariable UUID projectId) {
        requireAccess(projectId);
        return ResponseEntity.ok(workerClient.getTree(projectId));
    }

    @GetMapping
    public ResponseEntity<String> read(@PathVariable UUID projectId, @RequestParam String path) {
        requireAccess(projectId);
        return ResponseEntity.ok(workerClient.readFile(projectId, path));
    }

    @PutMapping
    public ResponseEntity<Void> write(@PathVariable UUID projectId, @RequestParam String path, @RequestBody String content) {
        requireAccess(projectId);
        workerClient.writeFile(projectId, path, content);
        return ResponseEntity.ok().build();
    }

    @PostMapping
    public ResponseEntity<Void> create(@PathVariable UUID projectId, @RequestBody CreateFileRequest req) {
        requireAccess(projectId);
        workerClient.createFile(projectId, req);
        return ResponseEntity.status(201).build();
    }

    @PatchMapping
    public ResponseEntity<Void> rename(@PathVariable UUID projectId, @RequestBody RenameFileRequest req) {
        requireAccess(projectId);
        workerClient.renameFile(projectId, req);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> delete(@PathVariable UUID projectId, @RequestParam String path) {
        requireAccess(projectId);
        workerClient.deleteFile(projectId, path);
        return ResponseEntity.noContent().build();
    }
}
