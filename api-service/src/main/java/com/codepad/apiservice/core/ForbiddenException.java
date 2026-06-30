package com.codepad.apiservice.core;

public class ForbiddenException extends DomainException {
    public ForbiddenException(String message) {
        super(message);
    }
}
