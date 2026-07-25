package com.codepad.apiservice.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;

@Slf4j
@Configuration
public class FirebaseConfig {

    @PostConstruct
    public void initialize() {
        try {
            if (FirebaseApp.getApps().isEmpty()) {
                String base64Credentials = System.getenv("FIREBASE_SERVICE_ACCOUNT_BASE64");
                InputStream credentialsStream;

                if (base64Credentials != null && !base64Credentials.trim().isEmpty()) {
                    byte[] decodedBytes = Base64.getDecoder().decode(base64Credentials);
                    credentialsStream = new ByteArrayInputStream(decodedBytes);
                    log.info("Using FIREBASE_SERVICE_ACCOUNT_BASE64 from environment");
                } else {
                    ClassPathResource resource = new ClassPathResource("serviceKey.json");
                    credentialsStream = resource.getInputStream();
                    log.info("Using serviceKey.json from classpath");
                }

                FirebaseOptions options = FirebaseOptions.builder()
                        .setCredentials(GoogleCredentials.fromStream(credentialsStream))
                        .build();

                FirebaseApp.initializeApp(options);
                log.info("Firebase Application has been initialized");
            }
        } catch (IOException e) {
            log.error("Error initializing Firebase: {}", e.getMessage());
        }
    }
}
