package com.codepad.apiservice.core.port.in.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CreateProjectRequest(
        @NotBlank @Size(max = 100) String name,
        @NotBlank @Pattern(regexp = "JAVA|PYTHON|CPP", message = "language must be JAVA, PYTHON or CPP") String language
) {}
