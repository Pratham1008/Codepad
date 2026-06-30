package com.codepad.apiservice.core;

public abstract class DomainException extends RuntimeException {
    public DomainException(String message) {
        super(message);
    }
}
