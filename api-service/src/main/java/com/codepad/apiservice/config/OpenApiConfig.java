package com.codepad.apiservice.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.models.Operation;
import io.swagger.v3.oas.models.PathItem;
import io.swagger.v3.oas.models.media.Content;
import io.swagger.v3.oas.models.media.MediaType;
import io.swagger.v3.oas.models.media.Schema;
import io.swagger.v3.oas.models.parameters.RequestBody;
import io.swagger.v3.oas.models.responses.ApiResponse;
import io.swagger.v3.oas.models.responses.ApiResponses;
import org.springdoc.core.customizers.OpenApiCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Verdict — Online Judge API",
                version = "1.0",
                description = "REST API for the Verdict online judge platform. "
                        + "Provides endpoints for user management, problem CRUD, "
                        + "code submission, and real-time judging results via SSE."
        )
)
@SecurityScheme(
        name = "bearerAuth",
        type = SecuritySchemeType.HTTP,
        scheme = "bearer",
        bearerFormat = "JWT",
        description = "Provide a valid JWT token obtained from the authentication endpoint."
)
public class OpenApiConfig {

    @Bean
    public OpenApiCustomizer webAuthnOpenApiCustomizer() {
        return openApi -> {
            openApi.getPaths()
                    .addPathItem("/webauthn/register/options", new PathItem().post(new Operation()
                            .summary("Start Passkey Registration")
                            .description("Request options to register a new WebAuthn passkey. Requires Bearer Token.")
                            .tags(java.util.List.of("WebAuthn / Passkeys"))
                            .responses(new ApiResponses().addApiResponse("200", new ApiResponse().description("Options JSON")))))
                    .addPathItem("/webauthn/register", new PathItem().post(new Operation()
                            .summary("Complete Passkey Registration")
                            .description("Submit the authenticator response to finish passkey registration. Requires Bearer Token.")
                            .tags(java.util.List.of("WebAuthn / Passkeys"))
                            .requestBody(new RequestBody().content(new Content().addMediaType("application/json", new MediaType().schema(new Schema<>().type("object")))))
                            .responses(new ApiResponses().addApiResponse("200", new ApiResponse().description("Registration successful")))))
                    .addPathItem("/webauthn/authenticate/options", new PathItem().post(new Operation()
                            .summary("Start Passkey Login")
                            .description("Request options to authenticate using a WebAuthn passkey.")
                            .tags(java.util.List.of("WebAuthn / Passkeys"))
                            .responses(new ApiResponses().addApiResponse("200", new ApiResponse().description("Options JSON")))))
                    .addPathItem("/login/webauthn", new PathItem().post(new Operation()
                            .summary("Complete Passkey Login")
                            .description("Submit the authenticator response to login. Returns JWT tokens upon success.")
                            .tags(java.util.List.of("WebAuthn / Passkeys"))
                            .requestBody(new RequestBody().content(new Content().addMediaType("application/json", new MediaType().schema(new Schema<>().type("object")))))
                            .responses(new ApiResponses().addApiResponse("200", new ApiResponse().description("JWT Tokens")))));
        };
    }
}
