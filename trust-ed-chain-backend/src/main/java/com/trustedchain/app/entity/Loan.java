package com.trustedchain.app.entity;

import com.trustedchain.app.entity.Enums.LoanStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Loan {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String code; // e.g., loan-1001

    @ManyToOne(optional = false)
    private Student student;

    private Integer amount;
    private String purpose;

    @Enumerated(EnumType.STRING)
    private LoanStatus status;

    private Boolean mentorApproved;
    private Boolean investorFunded;
    private Boolean adminApproved;
    private Double interestRate;
    private String college;
    private Integer trustScore;
    private Boolean bigLoan;

    private Instant createdAt;

    @ElementCollection
    private List<String> documents = new ArrayList<>();
}
