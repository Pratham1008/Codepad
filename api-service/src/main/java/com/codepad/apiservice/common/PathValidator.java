package com.codepad.apiservice.common;

import java.nio.file.Path;

public class PathValidator {
    // See SecurityUtils.constantTimeEquals in this package for the
    // X-Internal-Secret comparisons in RunCodeController.
    public static void validatePath(String path) {
        if (path == null || path.isBlank()) throw new IllegalArgumentException("Path cannot be empty");
        if (path.contains("..") || path.startsWith("/") || path.startsWith("\\")) {
            throw new IllegalArgumentException("Invalid path: traversal or absolute paths are not allowed");
        }
    }
}
