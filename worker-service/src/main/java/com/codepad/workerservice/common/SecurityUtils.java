package com.codepad.workerservice.common;

import java.security.MessageDigest;
import java.nio.charset.StandardCharsets;

public class SecurityUtils {
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
