package com.codepad.workerservice.judge.dto;

import java.util.List;
import java.util.UUID;

public record JudgeRequestDto(
        UUID userId,
        UUID problemId,
        String language,
        String sourceCode,
        List<TestCaseDto> testCases,
        int timeLimitMs,
        int memoryLimitKb
) {}
