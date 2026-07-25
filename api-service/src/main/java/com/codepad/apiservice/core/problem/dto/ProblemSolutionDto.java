package com.codepad.apiservice.core.problem.dto;

import java.util.Map;
import java.util.UUID;

public record ProblemSolutionDto(
        UUID problemId,
        String solutionMarkdown,
        Map<String, String> solutionCode
) {}
