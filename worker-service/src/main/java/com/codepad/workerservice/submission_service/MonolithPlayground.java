package com.codepad.workerservice.submission_service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
@Slf4j
public class MonolithPlayground {
    private final RestTemplate restTemplate;
    private final String monolithUrl;
    private final String internalSecret;

    public MonolithPlayground(
            @Value("${app.monolith.url:http://localhost:8080}") String monolithUrl,
            @Value("${app.internal.secret}") String internalSecret) {
        this.restTemplate = new RestTemplate();
        this.monolithUrl = monolithUrl;
        this.internalSecret = internalSecret;
    }

    public void sendOutput(String sessionId, String chunk, String type) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("X-Internal-Secret", internalSecret);
            HttpEntity<Map<String, String>> entity = new HttpEntity<>(
                Map.of("chunk", chunk, "type", type), headers);
            restTemplate.postForEntity(
                monolithUrl + "/api/run/internal/" + sessionId + "/output",
                entity, Void.class);
        } catch (Exception e) {
            log.error("Failed to send output chunk to monolith: {}", e.getMessage());
        }
    }

    public void complete(String sessionId) {
        sendOutput(sessionId, "", "done");
    }

    public String awaitStdin(String sessionId) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("X-Internal-Secret", internalSecret);
            ResponseEntity<Map> response = restTemplate.exchange(
                monolithUrl + "/api/run/internal/" + sessionId + "/stdin",
                HttpMethod.GET,
                new HttpEntity<>(headers),
                Map.class);
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                return (String) response.getBody().get("line");
            }
        } catch (Exception e) {
            log.warn("stdin poll failed: {}", e.getMessage());
        }
        return null;
    }
}
