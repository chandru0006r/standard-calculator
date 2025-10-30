package com.trustedchain.app.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CommunityPost {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Community community;

    @ManyToOne(optional = false)
    private Student author;

    @Column(length = 20)
    private String type; // message | poll

    @Column(length = 1000)
    private String text; // for message

    private String title; // for poll
    private Integer amount; // for poll
    private Integer votesFor;
    private Integer votesAgainst;
    private String status; // open | funded
}
