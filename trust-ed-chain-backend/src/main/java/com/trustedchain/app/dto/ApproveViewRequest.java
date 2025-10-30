package com.trustedchain.app.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ApproveViewRequest(@NotBlank String loanId, @NotNull Long investorId) {}
