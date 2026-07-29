package com.codepad.apiservice.config;

import com.google.firebase.auth.FirebaseAuth;
import com.codepad.apiservice.core.UserRepositoryPort;
import com.codepad.apiservice.core.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class WsAuthInterceptor implements HandshakeInterceptor {
    private final UserRepositoryPort userRepositoryPort;

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) {
        String token = request.getHeaders().getFirst("Sec-WebSocket-Protocol");
        if (token != null) {
            response.getHeaders().add("Sec-WebSocket-Protocol", token);
        } else {
            String query = request.getURI().getQuery();
            if (query != null) {
                for (String param : query.split("&")) {
                    if (param.startsWith("token=")) {
                        token = param.substring(6);
                        break;
                    }
                }
            }
        }
        if (token == null) return false;
        try {
            String uid = FirebaseAuth.getInstance().verifyIdToken(token).getUid();
            User user = userRepositoryPort.findByFirebaseUid(uid).orElse(null);
            if (user == null) return false;
            attributes.put("userId", user.getUserId());
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public void afterHandshake(ServerHttpRequest r, ServerHttpResponse s, WebSocketHandler h, Exception e) {}
}
