package com.trustedchain.app.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record InvestorRequestViewRequest(@NotBlank String loanId, @NotNull Long investorId, String investorName, String investorEmail) {}
