package com.codepad.apiservice.core.problem.dto;

import java.util.List;
import java.util.Map;

public record CreateProblemRequest(
        String title,
        String slug,
        String description,
        String difficulty,
        int timeLimitMs,
        int memoryLimitKb,
        List<String> tags,
        Map<String, String> starterCode,
        List<TestCaseDto> testCases,
        boolean isPublished,
        String solutionMarkdown,
        Map<String, String> solutionCode
) {}
