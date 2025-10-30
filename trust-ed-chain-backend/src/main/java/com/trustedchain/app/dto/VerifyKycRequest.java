package com.trustedchain.app.dto;

import jakarta.validation.constraints.NotBlank;

public record VerifyKycRequest(@NotBlank String studentId, boolean verified) {}
