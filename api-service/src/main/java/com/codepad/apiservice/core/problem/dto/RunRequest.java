package com.codepad.apiservice.core.problem.dto;

public record RunRequest(
        String language,
        String sourceCode
) {}
