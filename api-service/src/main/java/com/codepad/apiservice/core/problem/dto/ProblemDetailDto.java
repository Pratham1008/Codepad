package com.codepad.apiservice.core.problem.dto;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import java.io.Serializable;

public record ProblemDetailDto(
        UUID problemId,
        String slug,
        String title,
        String description,
        String difficulty,
        int timeLimitMs,
        int memoryLimitKb,
        List<String> tags,
        Map<String, String> starterCode,
        List<TestCaseDto> sampleTestCases,
        int totalTestCases
) implements Serializable {}
