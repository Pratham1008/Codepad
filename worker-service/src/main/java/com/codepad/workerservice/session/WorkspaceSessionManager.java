package com.codepad.workerservice.session;

import com.codepad.workerservice.worker.*;
import com.codepad.workerservice.diagnostics.session.PersistentExecPipe;
import jakarta.annotation.PreDestroy;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Component
@RequiredArgsConstructor
public class WorkspaceSessionManager {
    private static final Duration IDLE_TIMEOUT = Duration.ofMinutes(10);

    private final ContainerPool containerPool;
    private final LanguageStrategyFactory strategyFactory;
    private final DockerExecutor dockerExecutor;
    private final Map<WorkspaceSessionKey, WorkspaceSession> sessions = new ConcurrentHashMap<>();

    /** Called once when a WebSocket connects for a project or solve session. Idempotent — reuses an existing session. */
    public WorkspaceSession getOrCreate(WorkspaceSessionKey sessionKey, String languageStr) {
        WorkspaceSession session = sessions.computeIfAbsent(sessionKey, k -> {
            Language language = Language.valueOf(languageStr.toUpperCase());
            WorkspaceSession newSession;

            if (language == Language.JAVA && k.value().startsWith("project:")) {
                // Java gets no container at all for projects — in-process compiler API
                newSession = new WorkspaceSession(k, language, null, null);
            } else {
                try {
                    String containerId = containerPool.borrowContainer(5000);
                    if (containerId == null) {
                        throw new RuntimeException("No available containers");
                    }
                    LanguageStrategy strategy = strategyFactory.getStrategy(language);
                    PersistentExecPipe pipe = null;
                    if (strategy.getResidentCheckerLoopScript("DELIM") != null && !strategy.getResidentCheckerLoopScript("DELIM").isEmpty()) {
                        pipe = new PersistentExecPipe(containerId, strategy); // keeps one open docker exec -i pipe alive
                    }
                    newSession = new WorkspaceSession(k, language, containerId, pipe);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    throw new RuntimeException("Interrupted while waiting for container");
                }
            }
            log.info("Opened workspace session for key {} ({})", k.value(), language);
            return newSession;
        });
        session.touch();
        return session;
    }

    public void touch(WorkspaceSessionKey sessionKey) {
        WorkspaceSession s = sessions.get(sessionKey);
        if (s != null) s.touch();
    }

    public WorkspaceSession get(WorkspaceSessionKey sessionKey) {
        return sessions.get(sessionKey);
    }

    public void close(WorkspaceSessionKey sessionKey) {
        WorkspaceSession s = sessions.remove(sessionKey);
        if (s == null) return;
        if (s.execPipe != null) s.execPipe.close();
        if (s.containerId != null) {
            dockerExecutor.cleanWorkspace(s.containerId);
            containerPool.returnContainer(s.containerId);
        }
        log.info("Closed workspace session for key {}", sessionKey.value());
    }

    /** Reaps sessions nobody has typed in for IDLE_TIMEOUT — protects against leaked containers from dropped sockets. */
    @Scheduled(fixedRate = 60_000)
    public void reapIdle() {
        Instant cutoff = Instant.now().minus(IDLE_TIMEOUT);
        sessions.values().stream()
            .filter(s -> s.lastActivity.isBefore(cutoff))
            .map(s -> s.sessionKey)
            .forEach(this::close);
    }

    @PreDestroy
    public void shutdownAll() {
        sessions.keySet().forEach(this::close);
    }
}
