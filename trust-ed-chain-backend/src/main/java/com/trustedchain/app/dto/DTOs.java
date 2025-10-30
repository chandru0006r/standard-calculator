package com.trustedchain.app.dto;

import com.trustedchain.app.entity.Enums;
import jakarta.validation.constraints.*;
import java.time.Instant;
import java.util.List;

public record LoginRequest(@Email String email, @NotBlank String password, @NotBlank String role) {}
public record LoginResponse(String token, Long userId, String name, String email, String role, Boolean kycVerified) {}

public record StudentDto(String id, String name, String email, String college, String department, Integer semester,
                         Double cgpa, Integer trustScore, Integer sefBalance, Integer sefWithdrawalLimit,
                         Boolean kycVerified, String mentorId) {}

public record StudentUpdateSEFRequest(@NotBlank String studentId, Integer sefBalance, Integer sefWithdrawalLimit) {}
public record AssignMentorRequest(@NotBlank String studentId, String mentorId) {}
public record VerifyKycRequest(@NotBlank String studentId, boolean verified) {}
public record RemarkRequest(@NotBlank String studentId, @NotBlank String text) {}

public record WithdrawRequest(@NotBlank String studentId, @Positive int amount) {}

public record CommunityCreateRequest(@NotBlank String name, String description, @NotBlank String scope, @NotBlank String creatorId) {}
public record CommunityJoinRequest(@NotBlank String communityId, @NotBlank String studentId) {}
public record CommunityAddMemberRequest(@NotBlank String communityId, @NotBlank String memberId) {}
public record CommunityLeaveRequest(@NotBlank String communityId, @NotBlank String studentId) {}
public record CommunityMessageRequest(@NotBlank String communityId, @NotBlank String text, @NotBlank String studentId) {}
public record CommunityPollRequest(@NotBlank String communityId, @NotBlank String studentId, @NotBlank String title, @Positive int amount) {}

public record LoanDto(String id, String studentId, Integer amount, String purpose, String status,
                      Boolean mentorApproved, Boolean investorFunded, Boolean adminApproved,
                      Double interestRate, String college, Integer trustScore, Boolean isBigLoan, List<String> documents) {}

public record LoanApplyRequest(@NotBlank String studentId, @Positive int amount, @NotBlank String purpose,
                               List<String> documents, Integer trustScore, String college) {}
public record LoanIdRequest(@NotBlank String loanId) {}

public record InvestorRequestViewRequest(@NotBlank String loanId, @NotNull Long investorId, String investorName, String investorEmail) {}
public record ApproveViewRequest(@NotBlank String loanId, @NotNull Long investorId) {}

public record InvestorViewRequestDto(String loanId, String purpose, Integer amount, String college,
                                     String status, Long investorId, String investorName, String investorEmail) {}
