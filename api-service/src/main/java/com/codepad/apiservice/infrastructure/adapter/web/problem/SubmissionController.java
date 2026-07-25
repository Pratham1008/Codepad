package com.codepad.apiservice.infrastructure.adapter.web.problem;

import com.codepad.apiservice.core.User;
import com.codepad.apiservice.core.problem.SubmissionService;
import com.codepad.apiservice.core.problem.SessionPushService;
import com.codepad.apiservice.core.problem.dto.RunRequest;
import com.codepad.apiservice.core.problem.dto.SubmissionResultDto;
import com.codepad.apiservice.core.problem.dto.SubmissionSummaryDto;
import com.codepad.apiservice.core.problem.dto.SubmitRequest;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@RestController
@RequestMapping("/api/problems/{problemId}/submissions")
public class SubmissionController {
    private final SubmissionService submissionService;
    private final SessionPushService sessionPushService;
    private final ThreadPoolTaskExecutor judgeExecutor;
    private final Map<UUID, Bucket> buckets = new ConcurrentHashMap<>();

    public SubmissionController(SubmissionService submissionService, SessionPushService sessionPushService, ThreadPoolTaskExecutor judgeExecutor) {
        this.submissionService = submissionService;
        this.sessionPushService = sessionPushService;
        this.judgeExecutor = judgeExecutor;
    }

    private Bucket resolveBucket(UUID userId) {
        return buckets.computeIfAbsent(userId, id -> {
            Bandwidth limit = Bandwidth.classic(10, Refill.greedy(10, Duration.ofMinutes(1)));
            return Bucket.builder().addLimit(limit).build();
        });
    }

    @PostMapping("/run")
    public ResponseEntity<?> run(@PathVariable UUID problemId, @RequestBody RunRequest req, Authentication auth) {
        User user = (User) auth.getPrincipal();
        UUID userId = user.getUserId();

        if (!resolveBucket(userId).tryConsume(1)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body("Rate limit exceeded. Please wait.");
        }

        return ResponseEntity.ok(submissionService.runSamples(userId, problemId, req.language(), req.sourceCode()));
    }

    @PostMapping
    public ResponseEntity<?> submit(@PathVariable UUID problemId, @RequestBody SubmitRequest req, Authentication auth) {
        User user = (User) auth.getPrincipal();
        UUID userId = user.getUserId();

        if (!resolveBucket(userId).tryConsume(1)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body("Rate limit exceeded. Please wait.");
        }

        UUID submissionId = submissionService.createPending(userId, problemId, req.language(), req.sourceCode());

        judgeExecutor.submit(() -> {
            try {
                var result = submissionService.judgeAndPersist(submissionId, userId, problemId, req.language(), req.sourceCode());
                sessionPushService.pushToUserSession(userId, problemId, "submissionResult",
                        Map.of("submissionId", submissionId, "result", result));
            } catch (Exception e) {
                log.error("Failed to judge and persist submission {}", submissionId, e);
                var errorResult = new SubmissionResultDto("IE", e.getMessage(), null, 0, 0, 0, 0);
                sessionPushService.pushToUserSession(userId, problemId, "submissionResult",
                        Map.of("submissionId", submissionId, "result", errorResult));
            }
        });

        return ResponseEntity.accepted().body(Map.of("submissionId", submissionId.toString()));
    }

    @GetMapping
    public Page<SubmissionSummaryDto> history(@PathVariable UUID problemId, Authentication auth, Pageable pageable) {
        User user = (User) auth.getPrincipal();
        return submissionService.history(user.getUserId(), problemId, pageable);
    }
}
