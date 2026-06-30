package com.codepad.apiservice.config;

import com.codepad.apiservice.auth.JwtAuthenticationFilter;
import com.codepad.apiservice.auth.JwtService;
import com.codepad.apiservice.auth.PasskeyAuthSuccessHandler;
import com.codepad.apiservice.core.UserRepositoryPort;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.ObjectPostProcessor;
import org.springframework.security.web.webauthn.authentication.WebAuthnAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtService jwtService;
    private final UserRepositoryPort UserRepositoryPort;
    private final UserDetailsService userDetailsService;
    private final PasskeyAuthSuccessHandler passkeyAuthSuccessHandler;

    @org.springframework.beans.factory.annotation.Value("${app.webauthn.rp-id:localhost}")
    private String rpId;

    @org.springframework.beans.factory.annotation.Value("${app.webauthn.allowed-origins:http://localhost:3000,http://192.168.31.206:3000}")
    private String[] allowedOrigins;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        JwtAuthenticationFilter jwtAuthFilter =
                new JwtAuthenticationFilter(jwtService, UserRepositoryPort);

        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))

            
            .csrf(csrf -> csrf.disable())

            
            
            
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
            )

            .authorizeHttpRequests(auth -> auth
                
                .requestMatchers("/api/auth/**").permitAll()
                
                
                .requestMatchers("/webauthn/register/options").authenticated()
                .requestMatchers("/webauthn/register").authenticated()
                
                .requestMatchers("/webauthn/authenticate/options").permitAll()
                .requestMatchers("/login/webauthn").permitAll()
                .requestMatchers("/swagger-ui/**").permitAll()
                .requestMatchers("/api-docs/**").permitAll()
                .requestMatchers("/v3/api-docs/**").permitAll()
                .requestMatchers("/actuator/**").permitAll()
                .requestMatchers("/api/run/**").permitAll()
                .requestMatchers("/api/snippets/**").authenticated()
                .requestMatchers("/api/users/**").authenticated()
                .anyRequest().authenticated()
            )

            
            .webAuthn(webAuthn -> webAuthn
                .rpName("CodePad Online Judge")
                .rpId(rpId)
                .allowedOrigins(allowedOrigins)
                .withObjectPostProcessor(new ObjectPostProcessor<WebAuthnAuthenticationFilter>() {
                    @Override
                    public <O extends WebAuthnAuthenticationFilter> O postProcess(O filter) {
                        filter.setAuthenticationSuccessHandler(passkeyAuthSuccessHandler);
                        return filter;
                    }
                })
            )

            
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        configuration.setAllowedOriginPatterns(List.of("*"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }
}
