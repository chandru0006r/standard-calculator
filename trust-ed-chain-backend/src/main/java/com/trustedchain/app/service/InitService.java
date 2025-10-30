package com.trustedchain.app.service;

import com.trustedchain.app.entity.*;
import com.trustedchain.app.entity.Enums.*;
import com.trustedchain.app.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.List;

@Component
@RequiredArgsConstructor
public class InitService implements CommandLineRunner {
    private final StudentRepository studentRepo;
    private final MentorRepository mentorRepo;
    private final LoanRepository loanRepo;
    private final UserAccountRepository userRepo;
    private final CommunityRepository communityRepo;
    private final CommunityPostRepository postRepo;

    @Override
    public void run(String... args) throws Exception {
        if (mentorRepo.count() == 0) {
            Mentor m = mentorRepo.save(Mentor.builder().code("men-101").name("Dr. Rao").email("mentor@college.edu").build());
            Student s1 = studentRepo.save(Student.builder()
                    .code("stu-001").name("Aarav Sharma").email("aarav@example.edu")
                    .college("ABC College").department("Computer Science").semester(5)
                    .cgpa(8.7).trustScore(78).sefBalance(12000).sefWithdrawalLimit(10000)
                    .kycVerified(true).mentor(m).build());
            Student s2 = studentRepo.save(Student.builder()
                    .code("stu-002").name("Sara Iyer").email("sara@example.edu")
                    .college("ABC College").department("Electronics").semester(3)
                    .cgpa(9.1).trustScore(88).sefBalance(8000).sefWithdrawalLimit(8000)
                    .kycVerified(false).mentor(m).build());

            userRepo.saveAll(List.of(
                    UserAccount.builder().email("demo@student.edu").passwordHash("noop").name("demo").role(Role.STUDENT).college("ABC College").build(),
                    UserAccount.builder().email("mentor@college.edu").passwordHash("noop").name("mentor").role(Role.MENTOR).build(),
                    UserAccount.builder().email("admin@college.edu").passwordHash("noop").name("admin").role(Role.ADMIN).build(),
                    UserAccount.builder().email("investor@net.com").passwordHash("noop").name("investor").role(Role.INVESTOR).kycVerified(false).build()
            ));

            loanRepo.save(Loan.builder().code("loan-1001").student(s1).amount(25000).purpose("Laptop repair")
                    .status(LoanStatus.PENDING).mentorApproved(false).investorFunded(false).adminApproved(false)
                    .interestRate(10.5).college("ABC College").trustScore(78).bigLoan(true)
                    .createdAt(Instant.now()).build());
            loanRepo.save(Loan.builder().code("loan-1002").student(s2).amount(15000).purpose("Lab course fee")
                    .status(LoanStatus.APPROVED).mentorApproved(true).investorFunded(false).adminApproved(false)
                    .interestRate(9.0).college("ABC College").trustScore(88).bigLoan(false)
                    .createdAt(Instant.now()).build());

            Community c1 = communityRepo.save(Community.builder().code("com-11").name("CS Batch 2023").description("Peer micro-funding for CS students").scope(CommunityScope.INSTITUTION).creator(s1).build());
            c1.getMembers().add(s1); communityRepo.save(c1);
            postRepo.save(CommunityPost.builder().community(c1).author(s1).type("poll").title("Need ₹500 for lab fee").amount(500).votesFor(8).votesAgainst(1).status("open").build());
            Community c2 = communityRepo.save(Community.builder().code("com-22").name("Robotics Club").description("Robotics community fund").scope(CommunityScope.FRIENDS).creator(s2).build());
            c2.getMembers().add(s1); c2.getMembers().add(s2); communityRepo.save(c2);
            postRepo.save(CommunityPost.builder().community(c2).author(s2).type("poll").title("Sensor purchase").amount(700).votesFor(5).votesAgainst(2).status("funded").build());
        }
    }
}
