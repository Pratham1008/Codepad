package com.codepad.apiservice.run;


public record RunCodeResponse(
        String stdout,
        String stderr,
        int exitCode,
        long executionTimeMs,
        long memoryUsageKb
) {}
