package com.codepad.apiservice.auth;

import com.codepad.apiservice.core.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Slf4j
@Service
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final long refreshTokenExpiryMs;

    public RefreshTokenService(
            RefreshTokenRepository refreshTokenRepository,
            @Value("${app.jwt.refresh-token-expiry-ms}") long refreshTokenExpiryMs
    ) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.refreshTokenExpiryMs = refreshTokenExpiryMs;
    }

    
    public RefreshToken createRefreshToken(User user) {
        RefreshToken refreshToken = RefreshToken.builder()
                .user(user)
                .token(UUID.randomUUID().toString())
                .expiresAt(LocalDateTime.now().plusNanos(refreshTokenExpiryMs * 1_000_000))
                .revoked(false)
                .build();

        refreshToken = refreshTokenRepository.save(refreshToken);
        log.debug("Created refresh token for user: {}", user.getUsername());
        return refreshToken;
    }

    
    public RefreshToken verifyRefreshToken(String token) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Refresh token not found"));

        if (refreshToken.isRevoked()) {
            log.warn("Attempt to use revoked refresh token for user: {}", refreshToken.getUser().getUsername());
            throw new IllegalArgumentException("Refresh token has been revoked");
        }

        if (refreshToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            log.warn("Attempt to use expired refresh token for user: {}", refreshToken.getUser().getUsername());
            throw new IllegalArgumentException("Refresh token has expired");
        }

        return refreshToken;
    }

    
    @Transactional
    public void revokeAllUserTokens(User user) {
        refreshTokenRepository.deleteByUser(user);
        log.debug("Revoked all refresh tokens for user: {}", user.getUsername());
    }
}
