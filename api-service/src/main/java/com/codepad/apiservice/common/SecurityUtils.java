package com.codepad.apiservice.common;

import java.nio.file.Path;
import java.security.MessageDigest;
import java.nio.charset.StandardCharsets;

public class SecurityUtils {
    /**
     * Constant-time string comparison for secrets (e.g. the X-Internal-Secret header).
     * String.equals() short-circuits on the first mismatched byte, which leaks timing
     * information an attacker can use to guess the secret one byte at a time
     * (CWE-208 / OWASP ASVS 6.2.2 "verify... constant-time comparison"). Mirrors
     * worker-service's SecurityUtils.constantTimeEquals.
     */
    public static boolean constantTimeEquals(String expected, String actual) {
        if (expected == null || actual == null) {
            return false;
        }
        return MessageDigest.isEqual(
            expected.getBytes(StandardCharsets.UTF_8),
            actual.getBytes(StandardCharsets.UTF_8)
        );
    }
}
