package com.trustedchain.app.dto;

import jakarta.validation.constraints.NotBlank;

public record CommunityLeaveRequest(@NotBlank String communityId, @NotBlank String studentId) {}
