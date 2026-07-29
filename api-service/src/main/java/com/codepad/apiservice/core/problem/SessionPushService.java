package com.codepad.apiservice.core.problem;

import com.codepad.apiservice.run.WorkerClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SessionPushService {
    private final WorkerClient workerClient;

    public void pushToUserSession(UUID userId, UUID problemId, String language, String type, Map<String, Object> data) {
        workerClient.pushToUserSession(userId, problemId, language, type, data);
    }
}
