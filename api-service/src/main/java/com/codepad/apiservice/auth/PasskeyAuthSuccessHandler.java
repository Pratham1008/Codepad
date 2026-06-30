package com.codepad.apiservice.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.codepad.apiservice.auth.dto.AuthResponse;
import com.codepad.apiservice.core.User;
import com.codepad.apiservice.core.UserRepositoryPort;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;


@Slf4j
@Component
@RequiredArgsConstructor
public class PasskeyAuthSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;
    private final UserRepositoryPort UserRepositoryPort;
    
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication) throws IOException {

        
        String principalName = authentication.getName();

        java.util.Optional<User> optionalUser;
        try {
            java.util.UUID uuid = java.util.UUID.fromString(principalName);
            optionalUser = UserRepositoryPort.findById(uuid);
        } catch (IllegalArgumentException e) {
            optionalUser = UserRepositoryPort.findByUsername(principalName);
        }

        User user = optionalUser
                .orElseThrow(() -> new IllegalStateException(
                        "Authenticated user not found in DB: " + principalName));

        
        refreshTokenService.revokeAllUserTokens(user);

        String accessToken = jwtService.generateToken(user);
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user);

        
        
        jakarta.servlet.http.HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        org.springframework.security.core.context.SecurityContextHolder.clearContext();

        log.info("Passkey login successful for user: {}", user.getUsername());

        AuthResponse authResponse = new AuthResponse(
                accessToken,
                refreshToken.getToken(),
                user.getUserId(),
                user.getUsername(),
                "USER"
        );

        response.setStatus(HttpServletResponse.SC_OK);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        objectMapper.writeValue(response.getWriter(), authResponse);
    }
}
