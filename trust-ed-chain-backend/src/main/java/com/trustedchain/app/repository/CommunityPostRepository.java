package com.trustedchain.app.repository;

import com.trustedchain.app.entity.CommunityPost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommunityPostRepository extends JpaRepository<CommunityPost, Long> {
    List<CommunityPost> findByCommunity_Code(String communityCode);
}
