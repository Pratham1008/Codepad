package com.codepad.apiservice.core.problem.dto;

public record SubmitRequest(
        String language,
        String sourceCode
) {}
