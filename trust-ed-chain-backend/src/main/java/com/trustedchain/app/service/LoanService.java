package com.trustedchain.app.service;

import com.trustedchain.app.entity.Enums.LoanStatus;
import com.trustedchain.app.entity.InvestorViewRequest;
import com.trustedchain.app.entity.Loan;
import com.trustedchain.app.entity.Student;
import com.trustedchain.app.entity.UserAccount;
import com.trustedchain.app.repository.InvestorViewRequestRepository;
import com.trustedchain.app.repository.LoanRepository;
import com.trustedchain.app.repository.StudentRepository;
import com.trustedchain.app.repository.UserAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LoanService {
    private final LoanRepository loanRepo;
    private final StudentRepository studentRepo;
    private final InvestorViewRequestRepository viewRepo;
    private final UserAccountRepository userRepo;

    public List<Loan> list() { return loanRepo.findAll(); }

    public Loan getByCode(String code) { return loanRepo.findByCode(code).orElseThrow(); }

    @Transactional
    public Loan apply(String studentCode, int amount, String purpose, List<String> docs, Integer trustScore, String college) {
        Student s = studentRepo.findByCode(studentCode).orElseThrow();
        boolean big = amount > 20000;
        double interest = Math.max(8, Math.min(20, 20 - Math.floor((trustScore != null ? trustScore : s.getTrustScore()) / 5.0)));
        Loan loan = Loan.builder()
                .code("loan-" + (int)(Math.random()*100000))
                .student(s)
                .amount(amount)
                .purpose(purpose)
                .status(LoanStatus.PENDING)
                .mentorApproved(false)
                .investorFunded(false)
                .adminApproved(!big)
                .interestRate(interest)
                .college(college != null ? college : s.getCollege())
                .trustScore(trustScore != null ? trustScore : s.getTrustScore())
                .bigLoan(big)
                .documents(docs)
                .createdAt(Instant.now())
                .build();
        return loanRepo.save(loan);
    }

    @Transactional
    public Loan mentorApprove(String loanCode) {
        Loan l = getByCode(loanCode);
        l.setMentorApproved(true);
        l.setStatus(l.getBigLoan() ? LoanStatus.MENTOR_APPROVED : LoanStatus.APPROVED);
        return l;
    }

    @Transactional
    public Loan adminApprove(String loanCode) {
        Loan l = getByCode(loanCode);
        l.setAdminApproved(true);
        l.setStatus(LoanStatus.APPROVED);
        return l;
    }

    @Transactional
    public Loan fund(String loanCode) {
        Loan l = getByCode(loanCode);
        l.setInvestorFunded(true);
        l.setStatus(LoanStatus.FUNDED);
        return l;
    }

    @Transactional
    public Loan requestView(String loanCode, Long investorId, String name, String email) {
        Loan l = getByCode(loanCode);
        UserAccount inv = userRepo.findById(investorId).orElseThrow();
        InvestorViewRequest req = viewRepo.findByLoan_CodeAndInvestor_Id(loanCode, investorId)
                .orElse(InvestorViewRequest.builder().loan(l).investor(inv).build());
        if (req.getId() == null) {
            req.setStatus(com.trustedchain.app.entity.Enums.ViewRequestStatus.PENDING);
            req.setRequestedAt(Instant.now());
        }
        viewRepo.save(req);
        return l;
    }
}
