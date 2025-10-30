package com.trustedchain.app.dto;

public record StudentDto(String id, String name, String email, String college, String department, Integer semester,
                         Double cgpa, Integer trustScore, Integer sefBalance, Integer sefWithdrawalLimit,
                         Boolean kycVerified, String mentorId) {}
