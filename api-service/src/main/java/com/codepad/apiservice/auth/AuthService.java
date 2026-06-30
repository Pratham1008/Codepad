package com.codepad.apiservice.auth;

import com.codepad.apiservice.auth.dto.*;
import com.codepad.apiservice.core.User;
import com.codepad.apiservice.core.UserRepositoryPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {

    private final UserRepositoryPort UserRepositoryPort;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;

    
    public AuthResponse register(RegisterRequest request) {
        if (UserRepositoryPort.existsByUsername(request.username())) {
            throw new IllegalArgumentException("Username '" + request.username() + "' is already taken");
        }
        if (UserRepositoryPort.existsByEmail(request.email())) {
            throw new IllegalArgumentException("Email '" + request.email() + "' is already registered");
        }

        User user = User.builder()
                .username(request.username())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .build();
        user = UserRepositoryPort.save(user);

        log.info("Registered new user: {}", user.getUsername());

        return buildAuthResponse(user);
    }

    
    public AuthResponse login(LoginRequest request) {
        User user = UserRepositoryPort.findByUsername(request.username())
                .orElseThrow(() -> new IllegalArgumentException("Invalid username or password"));

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid username or password");
        }

        log.info("User logged in: {}", user.getUsername());

        return buildAuthResponse(user);
    }

    
    public AuthResponse refreshToken(RefreshTokenRequest request) {
        RefreshToken refreshToken = refreshTokenService.verifyRefreshToken(request.refreshToken());
        User user = refreshToken.getUser();

        
        refreshTokenService.revokeAllUserTokens(user);

        log.info("Refreshed tokens for user: {}", user.getUsername());

        return buildAuthResponse(user);
    }

    private AuthResponse buildAuthResponse(User user) {
        String accessToken = jwtService.generateToken(user);
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user);

        return new AuthResponse(
                accessToken,
                refreshToken.getToken(),
                user.getUserId(),
                user.getUsername(),
                "USER"
        );
    }
}
