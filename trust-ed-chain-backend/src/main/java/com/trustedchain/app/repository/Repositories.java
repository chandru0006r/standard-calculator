package com.trustedchain.app.repository;

import com.trustedchain.app.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {
    Optional<UserAccount> findByEmail(String email);
}

public interface MentorRepository extends JpaRepository<Mentor, Long> {
    Optional<Mentor> findByCode(String code);
}

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByCode(String code);
    List<Student> findByMentor_Code(String code);
}

public interface LoanRepository extends JpaRepository<Loan, Long> {
    Optional<Loan> findByCode(String code);
    List<Loan> findByStudent_Code(String studentCode);
}

public interface InvestorViewRequestRepository extends JpaRepository<InvestorViewRequest, Long> {
    List<InvestorViewRequest> findByInvestor_Id(Long investorId);
    List<InvestorViewRequest> findByLoan_Student_Code(String studentCode);
    Optional<InvestorViewRequest> findByLoan_CodeAndInvestor_Id(String loanCode, Long investorId);
}

public interface CommunityRepository extends JpaRepository<Community, Long> {
    Optional<Community> findByCode(String code);
}

public interface CommunityPostRepository extends JpaRepository<CommunityPost, Long> {
    List<CommunityPost> findByCommunity_Code(String communityCode);
}

public interface MentorRemarkRepository extends JpaRepository<MentorRemark, Long> {
    List<MentorRemark> findByStudent_Code(String studentCode);
}
