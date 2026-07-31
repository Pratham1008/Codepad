package com.codepad.workerservice.diagnostics;

import com.codepad.workerservice.session.WorkspaceSession;
import com.codepad.workerservice.session.WorkspaceSessionKey;
import com.codepad.workerservice.session.WorkspaceSessionManager;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.socket.TextMessage;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/internal/push")
@RequiredArgsConstructor
public class PushController {
    private final WorkspaceSessionManager sessionManager;
    private final ObjectMapper mapper = new ObjectMapper();
    
    @Value("${app.internal.secret}")
    private String internalSecret;

    @PostMapping
    public ResponseEntity<Void> pushMessage(@RequestBody Map<String, Object> req, @RequestHeader("X-Internal-Secret") String secret) {
        if (!com.codepad.workerservice.common.SecurityUtils.constantTimeEquals(internalSecret, secret)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        
        String userId = (String) req.get("userId");
        String problemId = (String) req.get("problemId");
        String language = (String) req.get("language");
        String type = (String) req.get("type");
        Map<String, Object> data = (Map<String, Object>) req.get("data");

        WorkspaceSessionKey sessionKey = WorkspaceSessionKey.forSolve(java.util.UUID.fromString(userId), java.util.UUID.fromString(problemId), language);
        WorkspaceSession session = sessionManager.get(sessionKey);
        
        if (session != null && session.getWebSocketSession() != null && session.getWebSocketSession().isOpen()) {
            try {
                session.getWebSocketSession().sendMessage(new TextMessage(mapper.writeValueAsString(
                        Map.of("type", type, "data", data))));
            } catch (Exception e) {
                log.warn("Failed to push message to session {}: {}", sessionKey.value(), e.getMessage());
            }
        }
        
        return ResponseEntity.ok().build();
    }
}
