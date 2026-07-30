package com.codepad.workerservice.diagnostics;

import com.codepad.workerservice.session.WorkspaceSession;
import com.codepad.workerservice.session.WorkspaceSessionKey;
import com.codepad.workerservice.session.WorkspaceSessionManager;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.List;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class DiagnosticsWebSocketHandler extends TextWebSocketHandler {
    private final WorkspaceSessionManager sessionManager;
    private final DiagnosticsService diagnosticsService;
    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public void afterConnectionEstablished(WebSocketSession wsSession) {
        WorkspaceSessionKey sessionKey = sessionKeyFrom(wsSession);
        String language = queryParam(wsSession, "language");
        if (sessionKey != null && language != null) {
            WorkspaceSession session = sessionManager.getOrCreate(sessionKey, language); // creates the session container/state exactly once
            session.setWebSocketSession(wsSession);
        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession wsSession, TextMessage message) throws Exception {
        WorkspaceSessionKey sessionKey = sessionKeyFrom(wsSession);
        if (sessionKey == null) return;
        
        Map<String, Object> req = mapper.readValue(message.getPayload(), Map.class);
        long requestId = req.get("requestId") != null ? ((Number) req.get("requestId")).longValue() : 0;
        String content = (String) req.get("content");

        WorkspaceSession session = sessionManager.getOrCreate(sessionKey, (String) req.get("language"));
        session.setWebSocketSession(wsSession);
        session.touch();
        session.lastRequestId.set(requestId);

        // Run off the WS I/O thread so a slow check never blocks other messages/pings.
        Thread.ofVirtual().start(() -> {
            String activeFile = (String) req.get("activeFile");
            List<DiagnosticEntry> entries = new java.util.ArrayList<>();
            
            // If we have an active file and it's a project session, run full workspace compilation!
            String rawKey = sessionKey.value();
            boolean isProjectSession = rawKey.startsWith("project:");
            if (activeFile != null && isProjectSession) {
                try {
                    String uuidStr = rawKey.substring("project:".length());
                    java.util.UUID projectId = java.util.UUID.fromString(uuidStr);
                    Map<String, List<DiagnosticEntry>> map = diagnosticsService.getDiagnostics(
                        projectId, 
                        session.language.name(), 
                        activeFile, 
                        content
                    );
                    if (map != null) {
                        // Try exact match first, then try all entries
                        if (map.containsKey(activeFile)) {
                            entries = map.get(activeFile);
                        } else if (!map.isEmpty()) {
                            // The compiler might return paths slightly differently
                            entries = map.values().stream()
                                .flatMap(List::stream)
                                .collect(java.util.stream.Collectors.toList());
                        }
                    }
                } catch (Exception e) {
                    log.error("Failed to run full diagnostics for key={}: {}", rawKey, e.getMessage(), e);
                }
            } else {
                if (session.language.name().equals("JAVA")) {
                    entries = InProcessJavaChecker.check(content);
                } else if (session.execPipe != null) {
                    entries = parseExecOutput(session.language, session.execPipe.check(content));
                }
            }

            if (session.lastRequestId.get() != requestId) return; // a newer keystroke superseded this — drop it server-side too

            try {
                TextMessage msg = new TextMessage(mapper.writeValueAsString(
                    Map.of("requestId", requestId, "diagnostics", entries)));
                synchronized(wsSession) {
                    if (wsSession.isOpen()) {
                        wsSession.sendMessage(msg);
                    }
                }
            } catch (Exception e) {
                log.warn("Failed to push diagnostics for session {}: {}", sessionKey.value(), e.getMessage());
            }
        });
    }

    @Override
    public void afterConnectionClosed(WebSocketSession wsSession, CloseStatus status) {
        // Don't close the session here — the user might just be reconnecting (flaky wifi, tab backgrounded).
        // The idle reaper in WorkspaceSessionManager handles real abandonment after 10 minutes.
        WorkspaceSessionKey key = sessionKeyFrom(wsSession);
        if (key != null) sessionManager.touch(key);
    }

    private WorkspaceSessionKey sessionKeyFrom(WebSocketSession s) { 
        String key = queryParam(s, "sessionKey");
        if (key == null) return null;
        return new WorkspaceSessionKey(key);
    }

    private String queryParam(WebSocketSession s, String key) {
        return org.springframework.web.util.UriComponentsBuilder.fromUri(s.getUri())
            .build().getQueryParams().getFirst(key);
    }

    private List<DiagnosticEntry> parseExecOutput(com.codepad.workerservice.worker.Language lang, String raw) {
        return DiagnosticsService.parseFastDiagnosticsStatic(lang, raw);
    }
}
