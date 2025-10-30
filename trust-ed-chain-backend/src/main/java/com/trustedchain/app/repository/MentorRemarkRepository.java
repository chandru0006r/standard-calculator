package com.trustedchain.app.repository;

import com.trustedchain.app.entity.MentorRemark;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MentorRemarkRepository extends JpaRepository<MentorRemark, Long> {
    List<MentorRemark> findByStudent_Code(String studentCode);
}
