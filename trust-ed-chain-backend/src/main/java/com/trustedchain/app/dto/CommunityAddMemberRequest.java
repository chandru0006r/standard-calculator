package com.trustedchain.app.dto;

import jakarta.validation.constraints.NotBlank;

public record CommunityAddMemberRequest(@NotBlank String communityId, @NotBlank String memberId) {}
