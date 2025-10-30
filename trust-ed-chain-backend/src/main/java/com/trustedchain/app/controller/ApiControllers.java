package com.trustedchain.app.controller;

import com.trustedchain.app.dto.*;
import com.trustedchain.app.entity.*;
import com.trustedchain.app.mapper.Mappers;
import com.trustedchain.app.repository.*;
import com.trustedchain.app.service.CommunityService;
import com.trustedchain.app.service.LoanService;
import com.trustedchain.app.service.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "*"})
public class ApiControllers {

    private final StudentService studentService;
    private final LoanService loanService;
    private final CommunityService communityService;
    private final StudentRepository studentRepo;
    private final InvestorViewRequestRepository viewRepo;
    private final UserAccountRepository userRepo;
    private final MentorRemarkRepository remarkRepo;

    // Auth (mock)
    @PostMapping("/auth/login")
    public ResponseEntity<LoginResponse> login(@RequestBody @Valid LoginRequest req) {
        var user = userRepo.findByEmail(req.email()).orElse(null);
        String token = "mock-token"; // replace with JWT in production
        return ResponseEntity.ok(new LoginResponse(token, user != null ? user.getId() : 1L,
                user != null ? user.getName() : "demo", req.email(), req.role(), user != null ? user.getKycVerified() : null));
    }

    @PostMapping("/investor/kyc")
    public ResponseEntity<?> completeKyc(@RequestParam Long investorId) {
        var user = userRepo.findById(investorId).orElseThrow();
        user.setKycVerified(true);
        userRepo.save(user);
        return ResponseEntity.ok().build();
    }

    // Students
    @GetMapping("/student/{studentId}")
    public StudentDto getStudent(@PathVariable String studentId) {
        return Mappers.toDto(studentService.getByCode(studentId));
    }

    @GetMapping("/students")
    public List<StudentDto> listStudents(@RequestParam(required = false) String mentorId) {
        List<Student> list = mentorId != null ? studentService.listByMentorCode(mentorId) : studentService.list();
        return list.stream().map(Mappers::toDto).collect(Collectors.toList());
    }

    @PostMapping("/admin/sef/update")
    public StudentDto updateSEF(@RequestBody @Valid StudentUpdateSEFRequest req) {
        return Mappers.toDto(studentService.updateSEF(req.studentId(), req.sefBalance(), req.sefWithdrawalLimit()));
    }

    @PostMapping("/sef/withdraw")
    public ResponseEntity<?> withdraw(@RequestBody @Valid WithdrawRequest req) {
        var s = studentService.withdraw(req.studentId(), req.amount());
        return ResponseEntity.status(201).body(new Object(){ public final boolean success=true; public final int balance=s.getSefBalance();});
    }

    @PostMapping("/admin/assign-mentor")
    public StudentDto assignMentor(@RequestBody @Valid AssignMentorRequest req) {
        return Mappers.toDto(studentService.assignMentor(req.studentId(), req.mentorId()));
    }

    @PostMapping("/mentor/verify-kyc")
    public StudentDto verifyKyc(@RequestBody @Valid VerifyKycRequest req) {
        return Mappers.toDto(studentService.verifyKyc(req.studentId(), req.verified()));
    }

    @PostMapping("/mentor/remark")
    public ResponseEntity<?> addRemark(@RequestBody @Valid RemarkRequest req) {
        var s = studentService.getByCode(req.studentId());
        remarkRepo.save(MentorRemark.builder().student(s).text(req.text()).createdAt(Instant.now()).build());
        return ResponseEntity.status(201).build();
    }

    // Loans
    @GetMapping("/loans")
    public List<LoanDto> listLoans() { return loanService.list().stream().map(Mappers::toDto).toList(); }

    @GetMapping("/loans/{loanId}")
    public LoanDto getLoan(@PathVariable String loanId) { return Mappers.toDto(loanService.getByCode(loanId)); }

    @PostMapping("/loans/apply")
    public ResponseEntity<LoanDto> apply(@RequestBody @Valid LoanApplyRequest req) {
        var l = loanService.apply(req.studentId(), req.amount(), req.purpose(), req.documents(), req.trustScore(), req.college());
        return ResponseEntity.status(201).body(Mappers.toDto(l));
    }

    @PostMapping("/loans/mentor-approve")
    public LoanDto mentorApprove(@RequestBody @Valid LoanIdRequest req) { return Mappers.toDto(loanService.mentorApprove(req.loanId())); }

    @PostMapping("/loans/admin-approve")
    public LoanDto adminApprove(@RequestBody @Valid LoanIdRequest req) { return Mappers.toDto(loanService.adminApprove(req.loanId())); }

    @PostMapping("/loans/fund")
    public LoanDto fund(@RequestBody @Valid LoanIdRequest req) { return Mappers.toDto(loanService.fund(req.loanId())); }

    // Investor view requests
    @PostMapping("/investor/request-view")
    public LoanDto requestView(@RequestBody @Valid InvestorRequestViewRequest req) {
        return Mappers.toDto(loanService.requestView(req.loanId(), req.investorId(), req.investorName(), req.investorEmail()));
    }

    @GetMapping("/investor/requests")
    public List<InvestorViewRequestDto> investorRequests(@RequestParam Long investorId) {
        return viewRepo.findByInvestor_Id(investorId).stream().map(v -> new InvestorViewRequestDto(
                v.getLoan().getCode(), v.getLoan().getPurpose(), v.getLoan().getAmount(), v.getLoan().getCollege(),
                v.getStatus().name().toLowerCase(), v.getInvestor().getId(), v.getInvestor().getName(), v.getInvestor().getEmail()
        )).toList();
    }

    @GetMapping("/student/requests")
    public List<InvestorViewRequestDto> studentRequests(@RequestParam String studentId) {
        return viewRepo.findByLoan_Student_Code(studentId).stream().map(v -> new InvestorViewRequestDto(
                v.getLoan().getCode(), v.getLoan().getPurpose(), v.getLoan().getAmount(), v.getLoan().getCollege(),
                v.getStatus().name().toLowerCase(), v.getInvestor().getId(), v.getInvestor().getName(), v.getInvestor().getEmail()
        )).toList();
    }

    @PostMapping("/student/approve-view")
    public LoanDto approveView(@RequestBody @Valid ApproveViewRequest req) {
        var v = viewRepo.findByLoan_CodeAndInvestor_Id(req.loanId(), req.investorId()).orElseThrow();
        v.setStatus(com.trustedchain.app.entity.Enums.ViewRequestStatus.APPROVED);
        viewRepo.save(v);
        return Mappers.toDto(v.getLoan());
    }

    // Communities
    @GetMapping("/communities")
    public List<Object> listCommunities() {
        return communityService.list().stream().map(c -> new Object(){
            public final String id = c.getCode();
            public final String name = c.getName();
            public final String description = c.getDescription();
            public final String scope = c.getScope().name().toLowerCase();
            public final List<String> members = c.getMembers().stream().map(Student::getCode).toList();
        }).toList();
    }

    @PostMapping("/communities/create")
    public ResponseEntity<?> createCommunity(@RequestBody @Valid CommunityCreateRequest req) {
        var c = communityService.create(req.name(), req.description(), req.scope(), req.creatorId());
        return ResponseEntity.status(201).body(new Object(){ public final String id=c.getCode(); public final String name=c.getName(); public final String description=c.getDescription(); public final String scope=c.getScope().name().toLowerCase(); public final List<String> members=c.getMembers().stream().map(Student::getCode).toList();});
    }

    @PostMapping("/communities/join")
    public Object joinCommunity(@RequestBody @Valid CommunityJoinRequest req) {
        var c = communityService.join(req.communityId(), req.studentId());
        return new Object(){ public final String id=c.getCode(); public final List<String> members=c.getMembers().stream().map(Student::getCode).toList(); };
    }

    @PostMapping("/communities/add-member")
    public Object addMember(@RequestBody @Valid CommunityAddMemberRequest req) {
        var c = communityService.addMember(req.communityId(), req.memberId());
        return new Object(){ public final String id=c.getCode(); public final List<String> members=c.getMembers().stream().map(Student::getCode).toList(); };
    }

    @PostMapping("/communities/leave")
    public Object leave(@RequestBody @Valid CommunityLeaveRequest req) {
        var c = communityService.leave(req.communityId(), req.studentId());
        return new Object(){ public final String id=c.getCode(); public final List<String> members=c.getMembers().stream().map(Student::getCode).toList(); };
    }

    @PostMapping("/communities/message")
    public ResponseEntity<?> message(@RequestBody @Valid CommunityMessageRequest req) {
        var p = communityService.message(req.communityId(), req.text(), req.studentId());
        return ResponseEntity.status(201).body(new Object(){ public final String id="msg-"+p.getId(); public final String type=p.getType(); public final String text=p.getText(); public final String studentId=p.getAuthor().getCode();});
    }

    @PostMapping("/communities/poll")
    public ResponseEntity<?> poll(@RequestBody @Valid CommunityPollRequest req) {
        var p = communityService.poll(req.communityId(), req.studentId(), req.title(), req.amount());
        return ResponseEntity.status(201).body(new Object(){ public final String id="poll-"+p.getId(); public final String type=p.getType(); public final String studentId=p.getAuthor().getCode(); public final String title=p.getTitle(); public final int amount=p.getAmount(); public final int votesFor=p.getVotesFor(); public final int votesAgainst=p.getVotesAgainst(); public final String status=p.getStatus();});
    }
}
