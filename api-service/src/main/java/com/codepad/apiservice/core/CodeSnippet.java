package com.codepad.apiservice.core;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "code_snippets")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CodeSnippet {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID snippetId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 20)
    private String language;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String sourceCode;

    @Column(columnDefinition = "TEXT")
    private String stdin;

    @Column(columnDefinition = "TEXT")
    private String stdout;

    @Column(columnDefinition = "TEXT")
    private String stderr;

    private Integer exitCode;
    private Integer executionTimeMs;
    private Integer memoryUsageKb;

    @Column(length = 200)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String notes;

    
    @Column(length = 500)
    private String tags;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    void prePersist() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    void preUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
