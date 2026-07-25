package com.codepad.apiservice.core.problem;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, UUID> {
    Page<Submission> findByUser_UserIdAndProblem_ProblemIdOrderBySubmittedAtDesc(UUID userId, UUID problemId, Pageable pageable);
    boolean existsByUser_UserIdAndProblem_ProblemIdAndVerdict(UUID userId, UUID problemId, String verdict);
    long countByUser_UserIdAndProblem_ProblemIdAndVerdictNot(UUID userId, UUID problemId, String verdict);
}
