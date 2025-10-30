package com.trustedchain.app.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import java.util.List;

public record LoanApplyRequest(@NotBlank String studentId, @Positive int amount, @NotBlank String purpose,
                               List<String> documents, Integer trustScore, String college) {}
