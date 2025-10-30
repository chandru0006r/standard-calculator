package com.trustedchain.app.mapper;

import com.trustedchain.app.dto.LoanDto;
import com.trustedchain.app.dto.StudentDto;
import com.trustedchain.app.entity.Loan;
import com.trustedchain.app.entity.Student;

public class Mappers {
    public static StudentDto toDto(Student s) {
        return new StudentDto(
                s.getCode(), s.getName(), s.getEmail(), s.getCollege(), s.getDepartment(), s.getSemester(),
                s.getCgpa(), s.getTrustScore(), s.getSefBalance(), s.getSefWithdrawalLimit(),
                s.getKycVerified(), s.getMentor() != null ? s.getMentor().getCode() : null
        );
    }

    public static LoanDto toDto(Loan l) {
        return new LoanDto(
                l.getCode(), l.getStudent().getCode(), l.getAmount(), l.getPurpose(),
                l.getStatus() != null ? l.getStatus().name().toLowerCase() : null,
                l.getMentorApproved(), l.getInvestorFunded(), l.getAdminApproved(),
                l.getInterestRate(), l.getCollege(), l.getTrustScore(), l.getBigLoan(), l.getDocuments()
        );
    }
}
