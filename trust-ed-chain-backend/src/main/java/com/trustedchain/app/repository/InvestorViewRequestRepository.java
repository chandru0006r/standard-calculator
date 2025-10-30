package com.trustedchain.app.repository;

import com.trustedchain.app.entity.InvestorViewRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InvestorViewRequestRepository extends JpaRepository<InvestorViewRequest, Long> {
    List<InvestorViewRequest> findByInvestor_Id(Long investorId);
    List<InvestorViewRequest> findByLoan_Student_Code(String studentCode);
    Optional<InvestorViewRequest> findByLoan_CodeAndInvestor_Id(String loanCode, Long investorId);
}
