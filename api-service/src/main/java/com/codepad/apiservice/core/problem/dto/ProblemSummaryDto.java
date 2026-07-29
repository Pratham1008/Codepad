package com.codepad.apiservice.core.problem.dto;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public record ProblemSummaryDto(
        UUID problemId,
        String slug,
        String title,
        String difficulty,
        List<String> tags
) implements java.io.Serializable {}
