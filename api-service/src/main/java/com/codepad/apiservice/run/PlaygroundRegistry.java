package com.codepad.apiservice.run;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.*;

@Component
public class PlaygroundRegistry {

    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();
    private final Map<String, BlockingQueue<String>> stdinQueues = new ConcurrentHashMap<>();

    public void register(String sessionId, SseEmitter emitter) {
        emitters.put(sessionId, emitter);
        stdinQueues.put(sessionId, new ArrayBlockingQueue<>(100));
        
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

    public void sendStdin(String sessionId, String line) {
        BlockingQueue<String> queue = stdinQueues.get(sessionId);
        if (queue != null) {
            queue.offer(line);
        }
    }

    public String awaitStdin(String sessionId, long timeoutMs) throws InterruptedException {
        BlockingQueue<String> queue = stdinQueues.get(sessionId);
        if (queue != null) {
            return queue.poll(timeoutMs, TimeUnit.MILLISECONDS);
        }
        return null;
    }

    private void cleanup(String sessionId) {
        emitters.remove(sessionId);
        stdinQueues.remove(sessionId);
    }
}
