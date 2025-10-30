package com.trustedchain.app.repository;

import com.trustedchain.app.entity.Community;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CommunityRepository extends JpaRepository<Community, Long> {
    Optional<Community> findByCode(String code);
}
