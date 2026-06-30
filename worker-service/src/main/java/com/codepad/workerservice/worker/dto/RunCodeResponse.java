package com.codepad.workerservice.worker.dto;


public record RunCodeResponse(
        String stdout,
        String stderr,
        int exitCode,
        long executionTimeMs,
        long memoryUsageKb
) {}
