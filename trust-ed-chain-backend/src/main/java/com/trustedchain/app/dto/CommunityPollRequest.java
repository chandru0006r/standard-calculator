package com.trustedchain.app.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public record CommunityPollRequest(@NotBlank String communityId, @NotBlank String studentId, @NotBlank String title, @Positive int amount) {}
