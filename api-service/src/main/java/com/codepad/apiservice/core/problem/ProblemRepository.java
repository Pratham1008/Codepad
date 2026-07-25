package com.codepad.apiservice.core.problem;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProblemRepository extends JpaRepository<Problem, UUID> {
    Optional<Problem> findBySlug(String slug);
    Page<Problem> findByIsPublishedTrue(Pageable pageable);
    Page<Problem> findByDifficultyAndIsPublishedTrue(String difficulty, Pageable pageable);
    Page<Problem> findByDifficulty(String difficulty, Pageable pageable);
}
