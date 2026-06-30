package com.codepad.apiservice.core;

import java.util.UUID;

public interface ManageUserUseCase {
    UserResponse getUserById(UUID userId);
    void deleteUser(UUID userId);
}
