package com.trustedchain.app.dto;

import jakarta.validation.constraints.NotBlank;

public record CommunityMessageRequest(@NotBlank String communityId, @NotBlank String text, @NotBlank String studentId) {}
