package com.codepad.workerservice.judge.dto;

import java.util.UUID;

public record TestCaseResultDto(
        UUID testCaseId,
        String verdict,
        int timeMs,
        int memoryKb,
        String actualOutput
) {}
