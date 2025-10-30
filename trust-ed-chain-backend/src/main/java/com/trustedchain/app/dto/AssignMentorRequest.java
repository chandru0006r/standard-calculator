package com.trustedchain.app.dto;

import jakarta.validation.constraints.NotBlank;

public record AssignMentorRequest(@NotBlank String studentId, String mentorId) {}
