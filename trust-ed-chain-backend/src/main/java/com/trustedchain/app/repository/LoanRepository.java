package com.trustedchain.app.repository;

import com.trustedchain.app.entity.Loan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LoanRepository extends JpaRepository<Loan, Long> {
    Optional<Loan> findByCode(String code);
    List<Loan> findByStudent_Code(String studentCode);
}
