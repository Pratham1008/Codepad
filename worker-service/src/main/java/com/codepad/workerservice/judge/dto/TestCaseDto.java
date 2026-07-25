package com.codepad.workerservice.judge.dto;

import java.util.UUID;

public record TestCaseDto(
        UUID testCaseId,
        String input,
        String expectedOutput,
        boolean isSample
) {}
