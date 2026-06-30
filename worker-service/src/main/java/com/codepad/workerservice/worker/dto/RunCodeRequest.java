package com.codepad.workerservice.worker.dto;


public record RunCodeRequest(
        String language,
        String sourceCode,
        String stdin
) {}
