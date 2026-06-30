package com.codepad.apiservice.core;

public class LimitExceededException extends DomainException {
    public LimitExceededException(String message) {
        super(message);
    }
}
