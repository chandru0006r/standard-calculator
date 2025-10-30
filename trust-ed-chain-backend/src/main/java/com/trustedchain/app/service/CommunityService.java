package com.trustedchain.app.service;

import com.trustedchain.app.entity.*;
import com.trustedchain.app.entity.Enums.CommunityScope;
import com.trustedchain.app.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommunityService {
    private final CommunityRepository communityRepo;
    private final CommunityPostRepository postRepo;
    private final StudentRepository studentRepo;

    public List<Community> list() { return communityRepo.findAll(); }

    @Transactional
    public Community create(String name, String description, String scope, String creatorCode) {
        Student creator = studentRepo.findByCode(creatorCode).orElseThrow();
        Community c = Community.builder()
                .code("com-" + System.currentTimeMillis())
                .name(name)
                .description(description)
                .scope("institution".equalsIgnoreCase(scope) ? CommunityScope.INSTITUTION : CommunityScope.FRIENDS)
                .creator(creator)
                .build();
        c.getMembers().add(creator);
        return communityRepo.save(c);
    }

    @Transactional
    public Community join(String communityCode, String studentCode) {
        Community c = communityRepo.findByCode(communityCode).orElseThrow();
        Student s = studentRepo.findByCode(studentCode).orElseThrow();
        c.getMembers().add(s);
        return c;
    }

    @Transactional
    public Community addMember(String communityCode, String memberCode) {
        return join(communityCode, memberCode);
    }

    @Transactional
    public Community leave(String communityCode, String studentCode) {
        Community c = communityRepo.findByCode(communityCode).orElseThrow();
        Student s = studentRepo.findByCode(studentCode).orElseThrow();
        c.getMembers().remove(s);
        return c;
    }

    @Transactional
    public CommunityPost message(String communityCode, String text, String studentCode) {
        Community c = communityRepo.findByCode(communityCode).orElseThrow();
        Student s = studentRepo.findByCode(studentCode).orElseThrow();
        CommunityPost p = CommunityPost.builder().community(c).author(s).type("message").text(text).build();
        return postRepo.save(p);
    }

    @Transactional
    public CommunityPost poll(String communityCode, String studentCode, String title, int amount) {
        Community c = communityRepo.findByCode(communityCode).orElseThrow();
        Student s = studentRepo.findByCode(studentCode).orElseThrow();
        CommunityPost p = CommunityPost.builder().community(c).author(s).type("poll").title(title).amount(amount).votesFor(0).votesAgainst(0).status("open").build();
        return postRepo.save(p);
    }
}
