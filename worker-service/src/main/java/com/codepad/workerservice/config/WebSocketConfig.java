package com.codepad.workerservice.config;

import com.codepad.workerservice.diagnostics.DiagnosticsWebSocketHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.*;
import org.springframework.web.socket.server.HandshakeInterceptor;

@Configuration
@EnableWebSocket
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketConfigurer {
    private final DiagnosticsWebSocketHandler diagnosticsHandler;
    @Value("${app.internal.secret}")
    private String internalSecret;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(diagnosticsHandler, "/internal/projects/diagnostics/stream")
                .addInterceptors(internalSecretCheck())
                .setAllowedOrigins("*");
    }

    private HandshakeInterceptor internalSecretCheck() {
        return new HandshakeInterceptor() {
            @Override
            public boolean beforeHandshake(org.springframework.http.server.ServerHttpRequest request,
                                            org.springframework.http.server.ServerHttpResponse response,
                                            WebSocketHandler wsHandler, java.util.Map<String, Object> attributes) {
                String secret = request.getHeaders().getFirst("X-Internal-Secret");
                return com.codepad.workerservice.common.SecurityUtils.constantTimeEquals(internalSecret, secret);
            }
            @Override public void afterHandshake(org.springframework.http.server.ServerHttpRequest r, org.springframework.http.server.ServerHttpResponse s, WebSocketHandler h, Exception e) {}
        };
    }
}
