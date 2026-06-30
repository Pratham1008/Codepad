package com.codepad.apiservice.run;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.UUID;


@Slf4j
@Service
public class WorkerClient {

    @Value("${app.worker.url}")
    private String workerUrl;

    @Value("${app.internal.secret}")
    private String internalSecret;

    private final RestTemplate restTemplate = new RestTemplate();


    
    public <T, R> R triggerRunCode(T requestBody, Class<R> responseType) {
        String url = workerUrl + "/internal/run";
        log.info("Triggering run code: POST {}", url);

        try {
            HttpHeaders headers = buildHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<T> request = new HttpEntity<>(requestBody, headers);
            R response = restTemplate.postForObject(url, request, responseType);
            log.info("Run code completed successfully");
            return response;
        } catch (Exception e) {
            log.error("Failed to trigger run code", e);
            throw new RuntimeException("Failed to trigger run code", e);
        }
    }

    private HttpHeaders buildHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Internal-Secret", internalSecret);
        return headers;
    }

    public void triggerStreamRunCode(com.codepad.apiservice.run.RunCodeRequest request, String sessionId) {
        String url = workerUrl + "/internal/run/stream";
        log.info("Triggering stream run code: POST {}", url);

        try {
            HttpHeaders headers = buildHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<java.util.Map<String, Object>> entity = new HttpEntity<>(
                java.util.Map.of("language", request.language(),
                       "sourceCode", request.sourceCode(),
                       "sessionId", sessionId),
                headers);
            restTemplate.postForEntity(url, entity, Void.class);
        } catch (Exception e) {
            log.error("Failed to trigger stream run code for session={}", sessionId, e);
        }
    }
}
