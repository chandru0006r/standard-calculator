package com.trustedchain.app.dto;

import jakarta.validation.constraints.NotBlank;

public record RemarkRequest(@NotBlank String studentId, @NotBlank String text) {}
