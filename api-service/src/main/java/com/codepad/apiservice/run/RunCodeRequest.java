package com.codepad.apiservice.run;

import jakarta.validation.constraints.NotBlank;


public record RunCodeRequest(

        @NotBlank(message = "Language must not be blank")
        String language,

        @NotBlank(message = "Source code must not be blank")
        String sourceCode,

        String stdin
) {}
