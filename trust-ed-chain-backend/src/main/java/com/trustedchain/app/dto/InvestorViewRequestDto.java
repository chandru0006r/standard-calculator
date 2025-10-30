package com.trustedchain.app.dto;

public record InvestorViewRequestDto(String loanId, String purpose, Integer amount, String college,
                                     String status, Long investorId, String investorName, String investorEmail) {}
