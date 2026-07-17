package com.codepad.workerservice.diagnostics;
public record DiagnosticEntry(int line, int column, String message, String severity) {}
