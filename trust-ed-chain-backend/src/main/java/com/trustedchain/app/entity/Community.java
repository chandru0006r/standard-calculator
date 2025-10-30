package com.trustedchain.app.entity;

import com.trustedchain.app.entity.Enums.CommunityScope;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Community {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String code; // com-xxx

    private String name;
    private String description;

    @Enumerated(EnumType.STRING)
    private CommunityScope scope;

    @ManyToOne
    private Student creator;

    @ManyToMany
    @JoinTable(name = "community_members",
            joinColumns = @JoinColumn(name = "community_id"),
            inverseJoinColumns = @JoinColumn(name = "student_id"))
    private Set<Student> members = new HashSet<>();
}
