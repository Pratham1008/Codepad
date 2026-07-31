package com.codepad.workerservice.diagnostics;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/internal/projects/{projectId}/diagnostics")
@RequiredArgsConstructor
public class DiagnosticsController {
    private final DiagnosticsService diagnosticsService;
    @Value("${app.internal.secret}")
    private String internalSecret;

    @PostMapping
    public ResponseEntity<Map<String, Object>> check(@PathVariable UUID projectId, @RequestBody Map<String, String> req, @RequestHeader("X-Internal-Secret") String secret) {
        if (!com.codepad.workerservice.common.SecurityUtils.constantTimeEquals(internalSecret, secret)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        
        Map<String, List<DiagnosticEntry>> res = diagnosticsService.getDiagnostics(projectId, req.get("language"), req.get("activeFile"), req.get("content"));
        
        return ResponseEntity.ok(Map.of("diagnosticsByFile", res));
    }
}
