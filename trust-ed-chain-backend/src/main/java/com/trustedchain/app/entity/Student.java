package com.trustedchain.app.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Student {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String code; // e.g., stu-001

    private String name;

    @Column(unique = true)
    private String email;

    private String college;
    private String department;
    private Integer semester;

    private Double cgpa;
    private Integer trustScore;

    private Integer sefBalance;
    private Integer sefWithdrawalLimit;

    private Boolean kycVerified;

    @ManyToOne
    private Mentor mentor;
}
