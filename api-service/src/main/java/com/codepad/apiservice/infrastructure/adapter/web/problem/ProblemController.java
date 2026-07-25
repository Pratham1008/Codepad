package com.codepad.apiservice.infrastructure.adapter.web.problem;

import com.codepad.apiservice.core.User;
import com.codepad.apiservice.core.problem.ProblemService;
import com.codepad.apiservice.core.problem.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/problems")
@RequiredArgsConstructor
public class ProblemController {
    private final ProblemService problemService;
    private final com.codepad.apiservice.core.problem.SubmissionService submissionService;

    @GetMapping
    public Page<ProblemSummaryDto> list(@RequestParam(required=false) String difficulty, Pageable pageable) {
        return problemService.list(difficulty, pageable);
    }

    @GetMapping("/{slug}")
    public ProblemDetailDto get(@PathVariable String slug) {
        return problemService.getBySlug(slug);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ProblemDetailDto create(@RequestBody CreateProblemRequest req, Authentication auth) {
        User user = (User) auth.getPrincipal();
        return problemService.create(user.getUserId(), req);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ProblemDetailDto update(@PathVariable UUID id, @RequestBody UpdateProblemRequest req) {
        return problemService.update(id, req);
    }

    @PostMapping("/{id}/test-cases")
    @PreAuthorize("hasRole('ADMIN')")
    public void addTestCase(@PathVariable UUID id, @RequestBody AddTestCaseRequest req) {
        problemService.addTestCase(id, req);
    }

    @GetMapping("/{id}/solution")
    public org.springframework.http.ResponseEntity<?> getSolution(@PathVariable UUID id, Authentication auth) {
        User user = (User) auth.getPrincipal();
        var status = submissionService.getSolutionStatus(user.getUserId(), id);
        if (!status.unlocked()) {
            return org.springframework.http.ResponseEntity.status(423).body(status);
        }
        return org.springframework.http.ResponseEntity.ok(problemService.getSolution(id));
    }
}
