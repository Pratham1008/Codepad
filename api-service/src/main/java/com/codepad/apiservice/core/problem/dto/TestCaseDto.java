package com.codepad.apiservice.core.problem.dto;

import java.util.UUID;

import java.io.Serializable;

public record TestCaseDto(
        UUID testCaseId,
        String input,
        String expectedOutput,
        boolean isSample,
        String explanation
) implements Serializable {}
