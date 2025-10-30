package com.trustedchain.app.dto;

import jakarta.validation.constraints.NotBlank;

public record LoanIdRequest(@NotBlank String loanId) {}
