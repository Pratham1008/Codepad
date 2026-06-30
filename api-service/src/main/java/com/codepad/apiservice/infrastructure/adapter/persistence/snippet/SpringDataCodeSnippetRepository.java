package com.codepad.apiservice.infrastructure.adapter.persistence.snippet;

import com.codepad.apiservice.core.CodeSnippet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SpringDataCodeSnippetRepository extends JpaRepository<CodeSnippet, UUID> {

    @Query("SELECT s FROM CodeSnippet s WHERE s.user.userId = :userId ORDER BY s.createdAt DESC")
    Page<CodeSnippet> findByUserId(@Param("userId") UUID userId, Pageable pageable);

    @Query("SELECT s FROM CodeSnippet s WHERE s.user.userId = :userId AND LOWER(s.language) = LOWER(:language) ORDER BY s.createdAt DESC")
    List<CodeSnippet> findByUserIdAndLanguage(@Param("userId") UUID userId, @Param("language") String language);

    @Query("SELECT COUNT(s) FROM CodeSnippet s WHERE s.user.userId = :userId")
    long countByUserId(@Param("userId") UUID userId);

    @org.springframework.data.jpa.repository.Modifying
    @Query("DELETE FROM CodeSnippet s WHERE s.user.userId = :userId")
    void deleteAllByUserId(@Param("userId") UUID userId);
}
