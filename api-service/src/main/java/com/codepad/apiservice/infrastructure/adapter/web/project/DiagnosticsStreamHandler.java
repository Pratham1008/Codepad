package com.codepad.apiservice.infrastructure.adapter.web.project;

import com.codepad.apiservice.core.ManageProjectUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import java.net.URI;

import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

@Component
@RequiredArgsConstructor
public class DiagnosticsStreamHandler extends TextWebSocketHandler {
    private final ManageProjectUseCase manageProjectUseCase;
    @Value("${app.worker.ws-url}") // e.g. ws://worker-service:8081
    private String workerWsUrl;
    @Value("${app.internal.secret}")
    private String internalSecret;

    private static final int MAX_MESSAGES_PER_WINDOW = 20;
    private static final long WINDOW_MILLIS = 1000;

    @Override
    public void afterConnectionEstablished(WebSocketSession browserSession) throws Exception {
        browserSession.getAttributes().put("rl_windowStart", new AtomicLong(System.currentTimeMillis()));
        browserSession.getAttributes().put("rl_count", new AtomicInteger(0));

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
            language = "JAVA";
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
        if (isRateLimited(browserSession)) return;

        WebSocketSession workerSession = (WebSocketSession) browserSession.getAttributes().get("workerSession");
        if (workerSession != null && workerSession.isOpen()) workerSession.sendMessage(message);
    }

    private boolean isRateLimited(WebSocketSession session) {
        AtomicLong windowStart = (AtomicLong) session.getAttributes().get("rl_windowStart");
        AtomicInteger count = (AtomicInteger) session.getAttributes().get("rl_count");
        if (windowStart == null || count == null) return false;

        long now = System.currentTimeMillis();
        if (now - windowStart.get() > WINDOW_MILLIS) {
            windowStart.set(now);
            count.set(0);
        }
        return count.incrementAndGet() > MAX_MESSAGES_PER_WINDOW;
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
