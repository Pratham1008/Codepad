package com.codepad.apiservice.core;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record SnippetResponse(
    UUID snippetId,
    String language,
    String sourceCode,
    String stdin,
    String stdout,
    String stderr,
    Integer exitCode,
    Integer executionTimeMs,
    Integer memoryUsageKb,
    String title,
    String notes,
    List<String> tags,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {}
