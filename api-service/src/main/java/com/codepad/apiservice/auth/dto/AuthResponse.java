package com.codepad.apiservice.auth.dto;

import java.util.UUID;

public record AuthResponse(
        String accessToken,
        String refreshToken,
        UUID userId,
        String username,
        String role
) {
}
