package com.codepad.apiservice.run.dto;
import java.util.List;
import java.util.Map;
public record DiagnosticsResponse(Map<String, List<Diagnostic>> diagnosticsByFile) {
public record Diagnostic(int line, int column, String message, String severity) {}
}
