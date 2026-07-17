package com.codepad.apiservice.run;

import com.codepad.apiservice.core.ManageProjectUseCase;
import com.codepad.apiservice.core.Project;
import com.codepad.apiservice.run.dto.RunCodeResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/projects/{projectId}")
@RequiredArgsConstructor
@Tag(name = "Run Code", description = "Project execution")
public class RunCodeController {
    private final WorkerClient workerClient;
    private final PlaygroundRegistry playgroundRegistry;
    private final ManageProjectUseCase manageProjectUseCase;

    @org.springframework.beans.factory.annotation.Value("${app.internal.secret}")
    private String internalSecret;

    private UUID currentUserId() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        assert auth != null;
        return UUID.fromString(auth.getName());
    }

    @PostMapping("/run")
    @Operation(summary = "Run a project", description = "Compiles/runs all project files in a sandboxed container")
    public ResponseEntity<RunCodeResponseDto> run(@PathVariable UUID projectId, @RequestBody(required = false) java.util.Map<String, String> body) {
        Project project = manageProjectUseCase.requireOwnedProject(currentUserId(), projectId);
        String stdin = body != null ? body.get("stdin") : null;
        RunCodeResponseDto response = workerClient.triggerRunCode(projectId, project.getLanguage(), stdin);
        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "/run/stream", produces = org.springframework.http.MediaType.TEXT_EVENT_STREAM_VALUE)
    public org.springframework.web.servlet.mvc.method.annotation.SseEmitter runStream(@PathVariable UUID projectId, jakarta.servlet.http.HttpServletResponse response) {
        Project project = manageProjectUseCase.requireOwnedProject(currentUserId(), projectId);
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("X-Accel-Buffering", "no");

        var emitter = new org.springframework.web.servlet.mvc.method.annotation.SseEmitter(300_000L);
        String sessionId = UUID.randomUUID().toString();
        playgroundRegistry.register(sessionId, emitter);

        Thread.ofVirtual().start(() -> workerClient.triggerStreamRunCode(projectId, project.getLanguage(), sessionId));

        try {
            emitter.send(org.springframework.web.servlet.mvc.method.annotation.SseEmitter.event().name("session").data(java.util.Map.of("sessionId", sessionId)));
        } catch (java.io.IOException ignored) {}
        return emitter;
    }

    @PostMapping("/run/stdin/{sessionId}")
    public ResponseEntity<Void> sendStdin(@PathVariable UUID projectId, @PathVariable String sessionId, @RequestBody java.util.Map<String, String> body) {
        playgroundRegistry.sendStdin(sessionId, body.getOrDefault("line", ""));
        return ResponseEntity.ok().build();
    }

    @PostMapping("/run/internal/{sessionId}/output")
    public ResponseEntity<Void> receiveOutput(@PathVariable String sessionId, @RequestHeader("X-Internal-Secret") String secret, @RequestBody java.util.Map<String, String> body) {
        if (!internalSecret.equals(secret)) return ResponseEntity.status(401).build();
        playgroundRegistry.sendOutput(sessionId, body.get("chunk"), body.get("type"));
        return ResponseEntity.ok().build();
    }

    @GetMapping("/run/internal/{sessionId}/stdin")
    public ResponseEntity<java.util.Map<String, String>> pollStdin(@PathVariable String sessionId, @RequestHeader("X-Internal-Secret") String secret) throws InterruptedException {
        if (!internalSecret.equals(secret)) return ResponseEntity.status(401).build();
        String line = playgroundRegistry.awaitStdin(sessionId, 20_000L);
        if (line == null) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(java.util.Map.of("line", line));
    }
}
