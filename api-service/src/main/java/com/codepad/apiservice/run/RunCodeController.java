package com.codepad.apiservice.run;



import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Value;


@Slf4j
@RestController
@RequestMapping("/api")
@Tag(name = "Run Code", description = "Playground code execution without judging")
public class RunCodeController {

    private final WorkerClient workerClient;
    private final PlaygroundRegistry playgroundRegistry;

    @Value("${app.internal.secret}")
    private String internalSecret;

    public RunCodeController(WorkerClient workerClient, PlaygroundRegistry playgroundRegistry) {
        this.workerClient = workerClient;
        this.playgroundRegistry = playgroundRegistry;
    }

    @PostMapping("/run")
    @Operation(summary = "Run code without judging", description = "Executes code in a sandboxed container and returns stdout/stderr")
    public ResponseEntity<RunCodeResponse> runCode(@Valid @RequestBody RunCodeRequest request) {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        String principal = authentication != null ? authentication.getName() : "anonymous";
        log.info("Run code request from user={} language={}", principal, request.language());

        RunCodeResponse response = workerClient.triggerRunCode(request, RunCodeResponse.class);
        log.info("Run code completed for user={}: exitCode={} executionTimeMs={}",
                principal, response.exitCode(), response.executionTimeMs());

        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "/run/stream", produces = org.springframework.http.MediaType.TEXT_EVENT_STREAM_VALUE)
    public org.springframework.web.servlet.mvc.method.annotation.SseEmitter runCodeStream(@Valid @RequestBody RunCodeRequest request,
                                     jakarta.servlet.http.HttpServletResponse response) {
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("X-Accel-Buffering", "no");
        
        org.springframework.web.servlet.mvc.method.annotation.SseEmitter emitter = new org.springframework.web.servlet.mvc.method.annotation.SseEmitter(300_000L);
        String sessionId = java.util.UUID.randomUUID().toString();
        
        playgroundRegistry.register(sessionId, emitter);
        
        Thread.ofVirtual().start(() -> {
            workerClient.triggerStreamRunCode(request, sessionId);
        });
        
        try {
            emitter.send(org.springframework.web.servlet.mvc.method.annotation.SseEmitter.event()
                .name("session")
                .data(java.util.Map.of("sessionId", sessionId)));
        } catch (java.io.IOException ignored) {}
        
        return emitter;
    }

    @PostMapping("/run/stdin/{sessionId}")
    public ResponseEntity<Void> sendStdin(@org.springframework.web.bind.annotation.PathVariable String sessionId,
                                           @RequestBody java.util.Map<String, String> body) {
        playgroundRegistry.sendStdin(sessionId, body.getOrDefault("line", ""));
        return ResponseEntity.ok().build();
    }

    @PostMapping("/run/internal/{sessionId}/output")
    public ResponseEntity<Void> receiveOutput(@org.springframework.web.bind.annotation.PathVariable String sessionId,
                                               @org.springframework.web.bind.annotation.RequestHeader("X-Internal-Secret") String secret,
                                               @RequestBody java.util.Map<String, String> body) {
        if (!internalSecret.equals(secret)) return ResponseEntity.status(401).build();
        playgroundRegistry.sendOutput(sessionId, body.get("chunk"), body.get("type"));
        return ResponseEntity.ok().build();
    }

    @org.springframework.web.bind.annotation.GetMapping("/run/internal/{sessionId}/stdin")
    public ResponseEntity<java.util.Map<String, String>> pollStdin(@org.springframework.web.bind.annotation.PathVariable String sessionId,
                                                           @org.springframework.web.bind.annotation.RequestHeader("X-Internal-Secret") String secret)
                                                           throws InterruptedException {
        if (!internalSecret.equals(secret)) return ResponseEntity.status(401).build();
        String line = playgroundRegistry.awaitStdin(sessionId, 20_000L);
        if (line == null) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(java.util.Map.of("line", line));
    }
}
