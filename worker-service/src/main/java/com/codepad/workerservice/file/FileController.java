package com.codepad.workerservice.file;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;

@RestController
@RequestMapping("/internal/projects/{projectId}")
@RequiredArgsConstructor
public class FileController {
    private final ProjectFileService projectFileService;
    @Value("${app.internal.secret}")
    private String internalSecret;

    private void checkSecret(String secret) {
        if (!internalSecret.equals(secret)) throw new RuntimeException("Unauthorized");
    }

    @PostMapping("/init")
    public void initProject(@PathVariable UUID projectId, @RequestBody Map<String, String> req, @RequestHeader("X-Internal-Secret") String secret) throws Exception {
        checkSecret(secret);
        projectFileService.initProject(projectId, req.get("language"));
    }

    @DeleteMapping
    public void deleteProject(@PathVariable UUID projectId, @RequestHeader("X-Internal-Secret") String secret) throws Exception {
        checkSecret(secret);
        projectFileService.deleteProject(projectId);
    }

    @GetMapping("/tree")
    public Map<String, Object> getTree(@PathVariable UUID projectId, @RequestHeader("X-Internal-Secret") String secret) throws Exception {
        checkSecret(secret);
        return projectFileService.getTree(projectId);
    }

    @GetMapping("/file")
    public String readFile(@PathVariable UUID projectId, @RequestParam String path, @RequestHeader("X-Internal-Secret") String secret) throws Exception {
        checkSecret(secret);
        return projectFileService.readFile(projectId, path);
    }

    @PutMapping("/file")
    public void writeFile(@PathVariable UUID projectId, @RequestParam String path, @RequestBody String content, @RequestHeader("X-Internal-Secret") String secret) throws Exception {
        checkSecret(secret);
        projectFileService.writeFile(projectId, path, content);
    }

    @PostMapping("/file")
    public void createFile(@PathVariable UUID projectId, @RequestBody Map<String, String> req, @RequestHeader("X-Internal-Secret") String secret) throws Exception {
        checkSecret(secret);
        projectFileService.createFile(projectId, req.get("path"), req.get("type"));
    }

    @PatchMapping("/file")
    public void renameFile(@PathVariable UUID projectId, @RequestBody Map<String, String> req, @RequestHeader("X-Internal-Secret") String secret) throws Exception {
        checkSecret(secret);
        projectFileService.renameFile(projectId, req.get("oldPath"), req.get("newPath"));
    }

    @DeleteMapping("/file")
    public void deleteFile(@PathVariable UUID projectId, @RequestParam String path, @RequestHeader("X-Internal-Secret") String secret) throws Exception {
        checkSecret(secret);
        projectFileService.deleteFile(projectId, path);
    }

    @GetMapping("/zip")
    public byte[] zipProject(@PathVariable UUID projectId, @RequestHeader("X-Internal-Secret") String secret) throws Exception {
        checkSecret(secret);
        return projectFileService.zipProject(projectId);
    }
}
