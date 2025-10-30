package com.trustedchain.app.dto;

import java.util.List;

public record LoanDto(String id, String studentId, Integer amount, String purpose, String status,
                      Boolean mentorApproved, Boolean investorFunded, Boolean adminApproved,
                      Double interestRate, String college, Integer trustScore, Boolean isBigLoan, List<String> documents) {}
