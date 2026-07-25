package com.codepad.apiservice.auth;

import com.codepad.apiservice.core.User;
import com.codepad.apiservice.core.UserRepositoryPort;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jspecify.annotations.NonNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

public class FirebaseAuthFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(FirebaseAuthFilter.class);
    private final UserRepositoryPort userRepositoryPort;

    public FirebaseAuthFilter(UserRepositoryPort userRepositoryPort) {
        this.userRepositoryPort = userRepositoryPort;
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        String token = null;
        final String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
        } else if (request.getRequestURI().contains("/status/stream") || request.getRequestURI().contains("/diagnostics/stream")) {
            token = request.getParameter("token");
        }

        if (token == null || token.isEmpty()) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
            String uid = decodedToken.getUid();
            String email = decodedToken.getEmail();
            String name = decodedToken.getName();
            if (name == null || name.isEmpty()) {
                name = email.split("@")[0];
            }

            if (SecurityContextHolder.getContext().getAuthentication() == null) {
                log.debug("Authenticating token UID: '{}', Email: '{}'", uid, email);
                User user = userRepositoryPort.findByFirebaseUid(uid).orElse(null);
                
                if (user == null) {
                    user = userRepositoryPort.findByEmail(email).orElse(null);
                    if (user != null) {
                        log.debug("Linking existing user {} to new Firebase UID {}", email, uid);
                        user.setFirebaseUid(uid);
                        user = userRepositoryPort.save(user);
                    } else {
                        log.debug("User not found by email: {}", email);
                    }
                }

                // Auto-sync user if they don't exist
                if (user == null) {
                    user = User.builder()
                            .firebaseUid(uid)
                            .email(email)
                            .username(name)
                            .role("ROLE_USER")
                            .build();
                    user = userRepositoryPort.save(user);
                }

                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                user,
                                null,
                                Collections.singletonList(
                                        new org.springframework.security.core.authority.SimpleGrantedAuthority(user.getRole())
                                )
                        );
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);

                log.debug("Authenticated user via Firebase: {}", user.getUsername());
            }
        } catch (Exception e) {
            log.warn("Firebase token verification failed: {}", e.getMessage());
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(@NonNull HttpServletRequest request) {
        String path = request.getServletPath();
        return path.startsWith("/swagger-ui")
                || path.startsWith("/api-docs")
                || path.startsWith("/v3/api-docs");
    }
}
