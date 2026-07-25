package com.codepad.apiservice.core.problem.dto;

public record AddTestCaseRequest(
        String input,
        String expectedOutput,
        boolean isSample,
        String explanation
) {}
