package com.codepad.apiservice.infrastructure.config;

import com.codepad.apiservice.core.UserRepositoryPort;
import com.codepad.apiservice.core.User;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class VerdictUserDetailsService implements UserDetailsService {

    private final UserRepositoryPort UserRepositoryPort;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        java.util.Optional<User> optionalUser;
        try {
            java.util.UUID uuid = java.util.UUID.fromString(username);
            optionalUser = UserRepositoryPort.findById(uuid);
        } catch (IllegalArgumentException e) {
            optionalUser = UserRepositoryPort.findByUsername(username);
        }

        User user = optionalUser
                .orElseThrow(() -> new UsernameNotFoundException(
                        "User not found: " + username));

        
        
        
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .authorities(Collections.emptyList())
                .build();
    }
}
