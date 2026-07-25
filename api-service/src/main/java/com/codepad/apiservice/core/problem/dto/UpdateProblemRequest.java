package com.codepad.apiservice.core.problem.dto;

import java.util.List;
import java.util.Map;

public record UpdateProblemRequest(
        String title,
        String slug,
        String description,
        String difficulty,
        Integer timeLimitMs,
        Integer memoryLimitKb,
        List<String> tags,
        Map<String, String> starterCode,
        List<TestCaseDto> testCases,
        Boolean isPublished,
        String solutionMarkdown,
        Map<String, String> solutionCode
) {}
