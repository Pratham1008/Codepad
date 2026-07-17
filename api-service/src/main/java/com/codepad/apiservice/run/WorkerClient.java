package com.codepad.apiservice.run;

import com.codepad.apiservice.run.dto.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.UUID;

@Slf4j
@Service
public class WorkerClient {
    @Value("${app.worker.url}")
    private String workerUrl;
    @Value("${app.internal.secret}")
    private String internalSecret;
    private final RestTemplate restTemplate = new RestTemplate();

    private HttpHeaders headers() {
        HttpHeaders h = new HttpHeaders();
        h.set("X-Internal-Secret", internalSecret);
        return h;
    }

    private HttpHeaders jsonHeaders() {
        HttpHeaders h = headers();
        h.setContentType(MediaType.APPLICATION_JSON);
        return h;
    }

    public void initProject(UUID projectId, String language) {
        restTemplate.postForEntity(workerUrl + "/internal/projects/" + projectId + "/init",
            new HttpEntity<>(java.util.Map.of("language", language), jsonHeaders()), Void.class);
    }

    public void deleteProjectFiles(UUID projectId) {
        restTemplate.exchange(workerUrl + "/internal/projects/" + projectId, HttpMethod.DELETE, new HttpEntity<>(headers()), Void.class);
    }

    public FileNode getTree(UUID projectId) {
        return restTemplate.exchange(workerUrl + "/internal/projects/" + projectId + "/tree", HttpMethod.GET, new HttpEntity<>(headers()), FileNode.class).getBody();
    }

    public String readFile(UUID projectId, String path) {
        String url = UriComponentsBuilder.fromUriString(workerUrl + "/internal/projects/" + projectId + "/file").queryParam("path", path).toUriString();
        return restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(headers()), String.class).getBody();
    }

    public void writeFile(UUID projectId, String path, String content) {
        String url = UriComponentsBuilder.fromUriString(workerUrl + "/internal/projects/" + projectId + "/file").queryParam("path", path).toUriString();
        HttpHeaders h = headers();
        h.setContentType(MediaType.TEXT_PLAIN);
        restTemplate.exchange(url, HttpMethod.PUT, new HttpEntity<>(content, h), Void.class);
    }

    public void createFile(UUID projectId, CreateFileRequest req) {
        restTemplate.postForEntity(workerUrl + "/internal/projects/" + projectId + "/file", new HttpEntity<>(req, jsonHeaders()), Void.class);
    }

    public void renameFile(UUID projectId, RenameFileRequest req) {
        restTemplate.exchange(workerUrl + "/internal/projects/" + projectId + "/file", HttpMethod.PATCH, new HttpEntity<>(req, jsonHeaders()), Void.class);
    }

    public void deleteFile(UUID projectId, String path) {
        String url = UriComponentsBuilder.fromUriString(workerUrl + "/internal/projects/" + projectId + "/file").queryParam("path", path).toUriString();
        restTemplate.exchange(url, HttpMethod.DELETE, new HttpEntity<>(headers()), Void.class);
    }

    public RunCodeResponseDto triggerRunCode(UUID projectId, String language, String stdin) {
        var body = java.util.Map.of("projectId", projectId.toString(), "language", language, "stdin", stdin == null ? "" : stdin);
        return restTemplate.postForObject(workerUrl + "/internal/run", new HttpEntity<>(body, jsonHeaders()), RunCodeResponseDto.class);
    }

    public void triggerStreamRunCode(UUID projectId, String language, String sessionId) {
        var body = java.util.Map.of("projectId", projectId.toString(), "language", language, "sessionId", sessionId);
        try {
            restTemplate.postForEntity(workerUrl + "/internal/run/stream", new HttpEntity<>(body, jsonHeaders()), Void.class);
        } catch (Exception e) {
            log.error("Failed stream run for session={}", sessionId, e);
        }
    }

    public DiagnosticsResponse getDiagnostics(UUID projectId, String language, DiagnosticsRequest req) {
        var body = java.util.Map.of("language", language, "activeFile", req.activeFile(), "content", req.content());
        return restTemplate.postForObject(workerUrl + "/internal/projects/" + projectId + "/diagnostics", new HttpEntity<>(body, jsonHeaders()), DiagnosticsResponse.class);
    }

    public byte[] downloadProjectZip(UUID projectId) {
        return restTemplate.exchange(workerUrl + "/internal/projects/" + projectId + "/zip", HttpMethod.GET, new HttpEntity<>(headers()), byte[].class).getBody();
    }
}
