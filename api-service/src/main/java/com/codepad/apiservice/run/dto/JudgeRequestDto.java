package com.codepad.apiservice.run.dto;

import com.codepad.apiservice.core.problem.dto.TestCaseDto;

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
