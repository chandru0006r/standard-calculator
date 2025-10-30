package com.trustedchain.app.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public record WithdrawRequest(@NotBlank String studentId, @Positive int amount) {}
