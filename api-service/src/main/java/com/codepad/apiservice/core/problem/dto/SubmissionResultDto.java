package com.codepad.apiservice.core.problem.dto;

import java.util.List;

public record SubmissionResultDto(
        String verdict,
        String compileError,
        List<TestCaseResultDto> results,
        int maxTimeMs,
        int maxMemoryKb,
        int passedCount,
        int totalCount
) {}
