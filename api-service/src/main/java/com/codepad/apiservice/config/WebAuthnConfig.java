package com.codepad.apiservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.security.web.webauthn.management.JdbcPublicKeyCredentialUserEntityRepository;
import org.springframework.security.web.webauthn.management.JdbcUserCredentialRepository;

@Configuration
public class WebAuthnConfig {

    
    @Bean
    public JdbcPublicKeyCredentialUserEntityRepository publicKeyCredentialUserEntityRepository(
            JdbcOperations jdbcOperations) {
        return new JdbcPublicKeyCredentialUserEntityRepository(jdbcOperations);
    }

    
    @Bean
    public JdbcUserCredentialRepository userCredentialRepository(
            JdbcOperations jdbcOperations) {
        return new JdbcUserCredentialRepository(jdbcOperations);
    }
}
