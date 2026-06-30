package com.codepad.workerservice.worker;

import com.codepad.workerservice.worker.dto.RunCodeRequest;
import com.codepad.workerservice.worker.dto.RunCodeResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequestMapping("/internal/run")
public class RunCodeController {

    private final RunCodeService runCodeService;
    private final String internalSecret;

    public RunCodeController(RunCodeService runCodeService,
                             @Value("${app.internal.secret}") String internalSecret) {
        this.runCodeService = runCodeService;
        this.internalSecret = internalSecret;
    }

    
    @PostMapping
    public ResponseEntity<RunCodeResponse> runCode(@RequestBody RunCodeRequest request,
                                                   @RequestHeader("X-Internal-Secret") String secret) {

        if (!internalSecret.equals(secret)) {
            log.warn("Unauthorized run code request — invalid secret");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        log.info("Received run code request: language={}", request.language());

        RunCodeResponse response = runCodeService.runCode(request);

        log.info("Run code completed: exitCode={} executionTimeMs={}",
                response.exitCode(), response.executionTimeMs());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/stream")
    public ResponseEntity<Void> runStream(@RequestHeader("X-Internal-Secret") String secret,
                                           @RequestBody java.util.Map<String, String> body) {
        if (!internalSecret.equals(secret)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        
        RunCodeRequest req = new RunCodeRequest(body.get("language"), body.get("sourceCode"), null);
        String sessionId = body.get("sessionId");
        
        runCodeService.runCodeStreaming(req, sessionId);
        return ResponseEntity.ok().build();
    }
}
