package com.codepad.apiservice.core.problem.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record SubmissionSummaryDto(
        UUID submissionId,
        String language,
        String verdict,
        int maxTimeMs,
        int maxMemoryKb,
        int passedCount,
        int totalCount,
        LocalDateTime submittedAt
) {}
