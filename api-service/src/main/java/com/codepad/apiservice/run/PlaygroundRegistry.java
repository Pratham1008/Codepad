package com.codepad.apiservice.run;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.*;
import java.util.function.Consumer;

@Component
public class PlaygroundRegistry {

    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();
    private final Map<String, BlockingQueue<String>> stdinQueues = new ConcurrentHashMap<>();
    private final Map<String, Consumer<String>> stdinCallbacks = new ConcurrentHashMap<>();
    private final Map<String, SessionContext> sessionContexts = new ConcurrentHashMap<>();

    public record SessionContext(java.util.UUID projectId, java.util.UUID userId) {}

    public void register(String sessionId, java.util.UUID projectId, java.util.UUID userId, SseEmitter emitter) {
        emitters.put(sessionId, emitter);
        stdinQueues.put(sessionId, new ArrayBlockingQueue<>(100));
        sessionContexts.put(sessionId, new SessionContext(projectId, userId));
        
        emitter.onCompletion(() -> cleanup(sessionId));
        emitter.onTimeout(() -> cleanup(sessionId));
        emitter.onError(e -> cleanup(sessionId));
    }

    public void sendOutput(String sessionId, String chunk, String type) {
        SseEmitter emitter = emitters.get(sessionId);
        if (emitter != null) {
            try {
                emitter.send(SseEmitter.event()
                        .name(type)
                        .data(Map.of("chunk", chunk != null ? chunk : "")));
                if ("done".equals(type) || "error".equals(type)) {
                    emitter.complete();
                    cleanup(sessionId);
                }
            } catch (IOException e) {
                cleanup(sessionId);
            }
        }
    }

    public void sendStdin(String sessionId, java.util.UUID projectId, java.util.UUID userId, String line) {
        SessionContext ctx = sessionContexts.get(sessionId);
        if (ctx == null || !ctx.projectId().equals(projectId) || !ctx.userId().equals(userId)) {
            throw new SecurityException("Unauthorized access to session");
        }
        Consumer<String> callback = stdinCallbacks.remove(sessionId);
        if (callback != null) {
            callback.accept(line);
        } else {
            BlockingQueue<String> queue = stdinQueues.get(sessionId);
            if (queue != null) {
                queue.offer(line);
            }
        }
    }

    public String awaitStdin(String sessionId, long timeoutMs) throws InterruptedException {
        BlockingQueue<String> queue = stdinQueues.get(sessionId);
        if (queue != null) {
            return queue.poll(timeoutMs, TimeUnit.MILLISECONDS);
        }
        return null;
    }

    public void awaitStdinAsync(String sessionId, Consumer<String> callback) {
        BlockingQueue<String> queue = stdinQueues.get(sessionId);
        if (queue != null && !queue.isEmpty()) {
            callback.accept(queue.poll());
            return;
        }
        stdinCallbacks.put(sessionId, callback);
        CompletableFuture.delayedExecutor(20, TimeUnit.SECONDS).execute(() -> {
            Consumer<String> cb = stdinCallbacks.remove(sessionId);
            if (cb != null) {
                cb.accept(null);
            }
        });
    }

    private void cleanup(String sessionId) {
        emitters.remove(sessionId);
        stdinQueues.remove(sessionId);
        stdinCallbacks.remove(sessionId);
        sessionContexts.remove(sessionId);
    }
}
