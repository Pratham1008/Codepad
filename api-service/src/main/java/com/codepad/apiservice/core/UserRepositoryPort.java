package com.codepad.apiservice.core;

import java.util.Optional;
import java.util.UUID;

public interface UserRepositoryPort {
    Optional<User> findById(UUID userId);
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    User save(User user);
    void delete(User user);
}
