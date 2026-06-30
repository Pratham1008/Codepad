package com.codepad.apiservice.core.port.in.dto;

import jakarta.validation.constraints.NotBlank;
import java.util.List;

import java.util.UUID;

public record SaveSnippetRequest(
    UUID snippetId,
    @NotBlank String language,
    @NotBlank String sourceCode,
    String stdin,
    String stdout,
    String stderr,
    Integer exitCode,
    Integer executionTimeMs,
    Integer memoryUsageKb,
    String title,
    String notes,
    List<String> tags
) {}
