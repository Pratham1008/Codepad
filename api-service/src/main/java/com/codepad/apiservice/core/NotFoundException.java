package com.codepad.apiservice.core;

public class NotFoundException extends DomainException {
    public NotFoundException(String message) {
        super(message);
    }
}
