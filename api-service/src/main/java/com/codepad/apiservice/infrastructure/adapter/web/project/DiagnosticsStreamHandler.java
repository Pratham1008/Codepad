package com.codepad.apiservice.infrastructure.adapter.web.project;

import com.codepad.apiservice.core.ManageProjectUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import java.net.URI;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class DiagnosticsStreamHandler extends TextWebSocketHandler {
    private final ManageProjectUseCase manageProjectUseCase;
    @Value("${app.worker.ws-url}") // e.g. ws://worker-service:8081
    private String workerWsUrl;
    @Value("${app.internal.secret}")
    private String internalSecret;

    @Override
    public void afterConnectionEstablished(WebSocketSession browserSession) throws Exception {
        UUID userId = (UUID) browserSession.getAttributes().get("userId");
        String sessionKey = qp(browserSession, "sessionKey");
        String language = qp(browserSession, "language");

        if (sessionKey == null || (!sessionKey.startsWith("project:") && !sessionKey.startsWith("solve:"))) {
            browserSession.close(CloseStatus.NOT_ACCEPTABLE.withReason("Invalid session key format"));
            return;
        }

        if (sessionKey.startsWith("project:")) {
            UUID projectId = UUID.fromString(sessionKey.substring("project:".length()));
            var project = manageProjectUseCase.requireOwnedProject(userId, projectId);
            if (language == null || language.trim().isEmpty()) {
                language = project.getLanguage();
            }
        } else if (sessionKey.startsWith("solve:")) {
            String problemIdStr = sessionKey.substring("solve:".length());
            sessionKey = "solve:" + userId.toString() + ":" + problemIdStr;
        }
        if (language == null || language.trim().isEmpty()) {
            language = "JAVA"; // Fallback language if not provided
        }

        String upstreamUrl = workerWsUrl + "/internal/projects/diagnostics/stream"
                + "?sessionKey=" + sessionKey + "&language=" + language;

        WebSocketHttpHeaders headers = new WebSocketHttpHeaders();
        headers.add("X-Internal-Secret", internalSecret);

        WebSocketSession workerSession = new org.springframework.web.socket.client.standard.StandardWebSocketClient()
            .execute(new TextWebSocketHandler() {
                @Override
                protected void handleTextMessage(WebSocketSession s, TextMessage m) throws Exception {
                    synchronized(browserSession) {
                        if (browserSession.isOpen()) browserSession.sendMessage(m);
                    }
                }
            }, headers, URI.create(upstreamUrl)).get();

        browserSession.getAttributes().put("workerSession", workerSession);
    }

    @Override
    protected void handleTextMessage(WebSocketSession browserSession, TextMessage message) throws Exception {
        WebSocketSession workerSession = (WebSocketSession) browserSession.getAttributes().get("workerSession");
        if (workerSession != null && workerSession.isOpen()) workerSession.sendMessage(message);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession browserSession, CloseStatus status) throws Exception {
        WebSocketSession workerSession = (WebSocketSession) browserSession.getAttributes().get("workerSession");
        if (workerSession != null) workerSession.close();
    }

    private String qp(WebSocketSession s, String key) {
        return org.springframework.web.util.UriComponentsBuilder.fromUri(s.getUri()).build().getQueryParams().getFirst(key);
    }
}
