package com.trustedchain.app.dto;

import jakarta.validation.constraints.NotBlank;

public record CommunityCreateRequest(@NotBlank String name, String description, @NotBlank String scope, @NotBlank String creatorId) {}
