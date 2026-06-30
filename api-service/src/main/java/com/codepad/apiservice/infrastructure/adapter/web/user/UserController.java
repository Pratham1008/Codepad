package com.codepad.apiservice.infrastructure.adapter.web.user;

import com.codepad.apiservice.core.ManageUserUseCase;
import com.codepad.apiservice.core.UserResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "Users")
@SecurityRequirement(name = "bearerAuth")
public class UserController {

    private final ManageUserUseCase manageUserUseCase;

    
    @GetMapping("/me")
    @Operation(summary = "Get current user info")
    public ResponseEntity<UserResponse> getCurrentUser() {
        String userId = Objects.requireNonNull(Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getPrincipal()).toString();
        log.debug("GET /api/users/me — principal={}", userId);

        UserResponse response = manageUserUseCase.getUserById(UUID.fromString(userId));
        return ResponseEntity.ok(response);
    }
}
