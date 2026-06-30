package com.codepad.apiservice.infrastructure.adapter.persistence.user;

import com.codepad.apiservice.core.User;
import com.codepad.apiservice.core.UserRepositoryPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class UserJpaAdapter implements UserRepositoryPort {

    private final SpringDataUserRepository repository;

    @Override
    public Optional<User> findById(UUID userId) {
        return repository.findById(userId);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return repository.findByUsername(username);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return repository.findByEmail(email);
    }

    @Override
    public boolean existsByUsername(String username) {
        return repository.existsByUsername(username);
    }

    @Override
    public boolean existsByEmail(String email) {
        return repository.existsByEmail(email);
    }

    @Override
    public User save(User user) {
        return repository.save(user);
    }

    @Override
    public void delete(User user) {
        repository.delete(user);
    }
}
