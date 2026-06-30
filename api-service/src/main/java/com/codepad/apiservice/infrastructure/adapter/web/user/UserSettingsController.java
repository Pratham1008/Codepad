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
import org.springframework.security.web.webauthn.api.Bytes;
import org.springframework.security.web.webauthn.management.JdbcUserCredentialRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/users/me")
@RequiredArgsConstructor
@Tag(name = "User Settings", description = "Endpoints for managing user settings and passkeys")
@SecurityRequirement(name = "bearerAuth")
public class UserSettingsController {

    private final ManageUserUseCase manageUserUseCase;
    private final JdbcUserCredentialRepository userCredentialRepository;
    private final JdbcOperations jdbcOperations;

    private UUID currentUserId() {
        String userId = Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getName();
        return UUID.fromString(userId);
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

    @GetMapping("/passkeys")
    @Operation(summary = "Get all passkeys for the current user")
    public ResponseEntity<List<Map<String, Object>>> getPasskeys() {
        String userIdStr = currentUserId().toString();
        
        List<Map<String, Object>> credentials = jdbcOperations.queryForList(
            "SELECT c.credential_id, c.created, c.last_used, c.label, e.name as user_name " +
            "FROM user_credentials c " +
            "JOIN user_entities e ON c.user_entity_user_id = e.id " +
            "WHERE e.name = ?", userIdStr);
            
        return ResponseEntity.ok(credentials.stream().map(row -> {
            
            String credentialIdStr = row.get("credential_id") != null ? row.get("credential_id").toString() : "";
            
            Map<String, Object> map = new java.util.HashMap<>();
            map.put("id", credentialIdStr);
            map.put("label", row.get("label") != null ? row.get("label").toString() : "");
            map.put("created", row.get("created") != null ? row.get("created").toString() : "");
            map.put("lastUsed", row.get("last_used") != null ? row.get("last_used").toString() : "");
            return map;
        }).collect(Collectors.toList()));
    }

    @DeleteMapping("/passkeys/{credentialIdBase64Url}")
    @Operation(summary = "Delete a specific passkey")
    public ResponseEntity<Void> deletePasskey(@PathVariable String credentialIdBase64Url) {
        try {
            byte[] credentialIdBytes = java.util.Base64.getUrlDecoder().decode(credentialIdBase64Url);
            userCredentialRepository.delete(new Bytes(credentialIdBytes));
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
