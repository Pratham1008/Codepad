package com.codepad.apiservice.core.problem.dto;

import java.util.UUID;

public record TestCaseResultDto(
        UUID testCaseId,
        String verdict,
        int timeMs,
        int memoryKb,
        String actualOutput
) {}
