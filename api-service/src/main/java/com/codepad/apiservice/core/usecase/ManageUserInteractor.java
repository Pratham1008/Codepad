package com.codepad.apiservice.core.usecase;

import com.codepad.apiservice.core.NotFoundException;
import com.codepad.apiservice.core.User;
import com.codepad.apiservice.core.ManageUserUseCase;
import com.codepad.apiservice.core.UserResponse;
import com.codepad.apiservice.core.CodeSnippetRepositoryPort;
import com.codepad.apiservice.core.UserRepositoryPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class ManageUserInteractor implements ManageUserUseCase {

    private final UserRepositoryPort UserRepositoryPort;
    private final CodeSnippetRepositoryPort snippetRepository;
    private final JdbcOperations jdbcOperations;

    @Override
    @Transactional(readOnly = true)
    public UserResponse getUserById(UUID userId) {
        log.debug("Fetching user by id={}", userId);

        User user = UserRepositoryPort.findById(userId)
                .orElseThrow(() -> {
                    log.warn("User not found: userId={}", userId);
                    return new NotFoundException("User not found with id: " + userId);
                });

        return new UserResponse(
                user.getUserId(),
                user.getUsername(),
                user.getEmail(),
                user.getCreatedAt()
        );
    }

    @Override
    @Transactional
    public void deleteUser(UUID userId) {
        log.info("Deleting user id={}", userId);
        
        User user = UserRepositoryPort.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        
        snippetRepository.deleteAllByUserId(userId);

        
        jdbcOperations.update("DELETE FROM user_credentials WHERE user_entity_user_id IN (SELECT id FROM user_entities WHERE name = ?)", user.getUsername());
        jdbcOperations.update("DELETE FROM user_entities WHERE name = ?", user.getUsername());

        
        UserRepositoryPort.delete(user);
    }
}
