package com.codepad.apiservice.infrastructure.adapter.web.user;

import com.codepad.apiservice.core.ManageUserUseCase;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/users/me")
@RequiredArgsConstructor
@Tag(name = "User Settings", description = "Endpoints for managing user settings and passkeys")
@SecurityRequirement(name = "bearerAuth")
public class UserSettingsController {

    private final ManageUserUseCase manageUserUseCase;

    private UUID currentUserId() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        return ((com.codepad.apiservice.core.User) auth.getPrincipal()).getUserId();
    }

    private String currentUsername() {
        return manageUserUseCase.getUserById(currentUserId()).username();
    }

    @DeleteMapping
    @Operation(summary = "Delete the current user account and all associated data")
    public ResponseEntity<Void> deleteAccount() {
        UUID userId = currentUserId();
        manageUserUseCase.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }

}
