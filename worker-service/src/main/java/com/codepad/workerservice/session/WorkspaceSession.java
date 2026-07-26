package com.codepad.workerservice.session;

import com.codepad.workerservice.worker.Language;
import com.codepad.workerservice.diagnostics.session.PersistentExecPipe;
import java.time.Instant;
import java.util.concurrent.atomic.AtomicLong;
import java.util.concurrent.locks.ReentrantLock;

public class WorkspaceSession {
    public final ReentrantLock sessionLock = new ReentrantLock();
    public final WorkspaceSessionKey sessionKey;
    public final Language language;
    public final String containerId;      // null for Java — in-process checker, no container needed
    public final PersistentExecPipe execPipe; // non-null for Python/C++
    public volatile Instant lastActivity = Instant.now();
    public final AtomicLong lastRequestId = new AtomicLong(0); // for server-side supersede logic

    public WorkspaceSession(WorkspaceSessionKey sessionKey, Language language, String containerId, PersistentExecPipe execPipe) {
        this.sessionKey = sessionKey;
        this.language = language;
        this.containerId = containerId;
        this.execPipe = execPipe;
    }

    public void touch() { lastActivity = Instant.now(); }

    private volatile org.springframework.web.socket.WebSocketSession webSocketSession;

    public void setWebSocketSession(org.springframework.web.socket.WebSocketSession wsSession) {
        this.webSocketSession = wsSession;
    }

    public org.springframework.web.socket.WebSocketSession getWebSocketSession() {
        return webSocketSession;
    }
}
