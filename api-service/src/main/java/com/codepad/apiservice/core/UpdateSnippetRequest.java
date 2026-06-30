package com.codepad.apiservice.core;

import java.util.List;

public record UpdateSnippetRequest(
    String title,
    String notes,
    List<String> tags
) {}
