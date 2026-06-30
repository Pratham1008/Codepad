package com.codepad.apiservice.core;

import java.time.LocalDateTime;
import java.util.UUID;

public record UserResponse(
        UUID userId,
        String username,
        String email,
        LocalDateTime createdAt
) {
}
