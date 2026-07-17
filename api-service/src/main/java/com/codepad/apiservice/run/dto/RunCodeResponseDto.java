package com.codepad.apiservice.run.dto;
public record RunCodeResponseDto(String stdout, String stderr, int exitCode, long executionTimeMs, long memoryUsageKb) {}
