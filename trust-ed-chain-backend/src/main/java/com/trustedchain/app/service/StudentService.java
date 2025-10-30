package com.trustedchain.app.service;

import com.trustedchain.app.entity.Mentor;
import com.trustedchain.app.entity.Student;
import com.trustedchain.app.repository.MentorRepository;
import com.trustedchain.app.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {
    private final StudentRepository studentRepo;
    private final MentorRepository mentorRepo;

    public Student getByCode(String code) { return studentRepo.findByCode(code).orElseThrow(); }
    public List<Student> list() { return studentRepo.findAll(); }
    public List<Student> listByMentorCode(String mentorCode) { return studentRepo.findByMentor_Code(mentorCode); }

    @Transactional
    public Student updateSEF(String studentCode, Integer balance, Integer limit) {
        Student s = getByCode(studentCode);
        if (balance != null) s.setSefBalance(balance);
        if (limit != null) s.setSefWithdrawalLimit(limit);
        return s;
    }

    @Transactional
    public Student withdraw(String studentCode, int amount) {
        Student s = getByCode(studentCode);
        if (amount > s.getSefWithdrawalLimit()) throw new IllegalArgumentException("Amount exceeds semester limit");
        if (amount > s.getSefBalance()) throw new IllegalArgumentException("Insufficient SEF balance");
        s.setSefBalance(s.getSefBalance() - amount);
        s.setTrustScore(Math.max(0, s.getTrustScore() - 1));
        return s;
    }

    @Transactional
    public Student assignMentor(String studentCode, String mentorCode) {
        Student s = getByCode(studentCode);
        Mentor m = mentorRepo.findByCode(mentorCode).orElse(null);
        s.setMentor(m);
        return s;
    }

    @Transactional
    public Student verifyKyc(String studentCode, boolean verified) {
        Student s = getByCode(studentCode);
        s.setKycVerified(verified);
        return s;
    }
}
