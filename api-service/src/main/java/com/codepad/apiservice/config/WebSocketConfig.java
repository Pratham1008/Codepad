package com.codepad.apiservice.config;

import com.codepad.apiservice.infrastructure.adapter.web.project.DiagnosticsStreamHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocket
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketConfigurer {
    private final DiagnosticsStreamHandler diagnosticsStreamHandler;
    private final WsAuthInterceptor wsAuthInterceptor;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(diagnosticsStreamHandler, "/api/projects/diagnostics/stream")
                .addInterceptors(wsAuthInterceptor)
                .setAllowedOriginPatterns("*");
    }
}
