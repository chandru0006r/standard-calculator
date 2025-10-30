package com.trustedchain.app.dto;

public record LoginResponse(String token, Long userId, String name, String email, String role, Boolean kycVerified) {}
