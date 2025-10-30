package com.trustedchain.app.dto;

import jakarta.validation.constraints.NotBlank;

public record CommunityJoinRequest(@NotBlank String communityId, @NotBlank String studentId) {}
