package com.codepad.workerservice.worker.dto;
import java.util.UUID;
public record RunCodeRequest(UUID projectId, String language, String stdin) {}
