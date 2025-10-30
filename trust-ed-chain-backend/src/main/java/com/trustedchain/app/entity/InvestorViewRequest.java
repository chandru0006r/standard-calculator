package com.trustedchain.app.entity;

import com.trustedchain.app.entity.Enums.ViewRequestStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class InvestorViewRequest {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Loan loan;

    @ManyToOne(optional = false)
    private UserAccount investor;

    @Enumerated(EnumType.STRING)
    private ViewRequestStatus status;

    private Instant requestedAt;
}
