package com.trustedchain.app.dto;

import jakarta.validation.constraints.NotBlank;

public record StudentUpdateSEFRequest(@NotBlank String studentId, Integer sefBalance, Integer sefWithdrawalLimit) {}
