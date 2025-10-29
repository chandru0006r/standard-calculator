import AxiosMockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import students from './students.json';
import loans from './loans.json';
import communities from './communities.json';

// Shared axios instance for mocks
const instance = axios.create({ baseURL: '/api' });

// Attach to global axios so apiClient works, too
const mock = new AxiosMockAdapter(axios, { delayResponse: 300 });
const mockLocal = new AxiosMockAdapter(instance, { delayResponse: 300 });

// In-memory data
let studentList = [...students];
let loanList = [...loans];
let communityList = [...communities];

function ok(data) { return [200, data]; }
function created(data) { return [201, data]; }
function notFound(msg = 'Not found') { return [404, { message: msg }]; }

function registerHandlers(m) {
  // Students
  m.onGet(/\/api\/students$/).reply((config) => {
    const mentorId = new URL('http://x' + (config.url || '')).searchParams.get('mentorId');
    if (mentorId) {
      return ok(studentList.filter((s) => s.mentorId === mentorId));
    }
    return ok(studentList);
  });
  m.onGet(/\/api\/student\/([^/]+)$/).reply((config) => {
    const id = config.url.split('/').pop();
    const student = studentList.find((s) => s.id === id);
    return student ? ok(student) : notFound('Student not found');
  });

  // Admin: update SEF
  m.onPost('/api/admin/sef/update').reply((config) => {
    const body = JSON.parse(config.data || '{}');
    const { studentId, sefBalance, sefWithdrawalLimit } = body;
    const student = studentList.find((s) => s.id === studentId);
    if (!student) return notFound('Student not found');
    if (typeof sefBalance === 'number') student.sefBalance = sefBalance;
    if (typeof sefWithdrawalLimit === 'number') student.sefWithdrawalLimit = sefWithdrawalLimit;
    return ok(student);
  });

  // SEF withdraw
  m.onPost('/api/sef/withdraw').reply((config) => {
    const body = JSON.parse(config.data || '{}');
    const { studentId, amount } = body;
    const student = studentList.find((s) => s.id === studentId);
    if (!student) return notFound('Student not found');
    if (amount > student.sefWithdrawalLimit) {
      return [400, { message: 'Amount exceeds semester limit' }];
    }
    if (amount > student.sefBalance) {
      return [400, { message: 'Insufficient SEF balance' }];
    }
    student.sefBalance -= amount;
    student.trustScore = Math.max(0, student.trustScore - 1);
    return created({ success: true, balance: student.sefBalance });
  });

  // Loans
  m.onGet(/\/api\/loans$/).reply(() => ok(loanList));
  m.onPost('/api/loans/apply').reply((config) => {
    const body = JSON.parse(config.data || '{}');
    const isBig = (body.amount || 0) > 20000;
    const newLoan = {
      id: `loan-${Math.floor(Math.random() * 100000)}`,
      status: 'pending',
      mentorApproved: false,
      investorFunded: false,
      adminApproved: !isBig, // small loans auto-admin-approved
      interestRate: Math.max(8, Math.min(20, 20 - Math.floor((body.trustScore || 70) / 5))),
      college: body.college || 'ABC College',
      trustScore: body.trustScore || 70,
      isBigLoan: isBig,
      documents: body.documents || [],
      ...body,
    };
    loanList.unshift(newLoan);
    return created(newLoan);
  });
  m.onPost('/api/loans/mentor-approve').reply((config) => {
    const body = JSON.parse(config.data || '{}');
    const { loanId } = body;
    const loan = loanList.find((l) => l.id === loanId);
    if (!loan) return notFound('Loan not found');
    loan.mentorApproved = true;
    loan.status = loan.isBigLoan ? 'mentor-approved' : 'approved';
    return ok(loan);
  });
  m.onPost('/api/loans/admin-approve').reply((config) => {
    const body = JSON.parse(config.data || '{}');
    const { loanId } = body;
    const loan = loanList.find((l) => l.id === loanId);
    if (!loan) return notFound('Loan not found');
    loan.adminApproved = true;
    loan.status = 'approved';
    return ok(loan);
  });
  m.onPost('/api/loans/fund').reply((config) => {
    const body = JSON.parse(config.data || '{}');
    const { loanId } = body;
    const loan = loanList.find((l) => l.id === loanId);
    if (!loan) return notFound('Loan not found');
    loan.investorFunded = true;
    loan.status = 'funded';
    return ok(loan);
  });

  // Communities
  m.onGet(/\/api\/communities$/).reply(() => ok(communityList));
  m.onPost('/api/communities/create').reply((config) => {
    const body = JSON.parse(config.data || '{}');
    const newCom = { id: `com-${Date.now()}`, posts: [], members: [], scope: 'friends', ...body };
    communityList.unshift(newCom);
    return created(newCom);
  });
  m.onPost('/api/communities/join').reply((config) => {
    const body = JSON.parse(config.data || '{}');
    const { communityId, studentId } = body;
    const com = communityList.find((c) => c.id === communityId);
    if (!com) return notFound('Community not found');
    if (!com.members.includes(studentId)) com.members.push(studentId);
    return ok(com);
  });
  m.onPost('/api/communities/add-member').reply((config) => {
    const body = JSON.parse(config.data || '{}');
    const { communityId, memberId } = body;
    const com = communityList.find((c) => c.id === communityId);
    if (!com) return notFound('Community not found');
    if (!com.members.includes(memberId)) com.members.push(memberId);
    return ok(com);
  });
  m.onPost('/api/communities/leave').reply((config) => {
    const body = JSON.parse(config.data || '{}');
    const { communityId, studentId } = body;
    const com = communityList.find((c) => c.id === communityId);
    if (!com) return notFound('Community not found');
    com.members = com.members.filter((m) => m !== studentId);
    return ok(com);
  });
  m.onPost('/api/communities/poll').reply((config) => {
    const body = JSON.parse(config.data || '{}');
    const { communityId, studentId, title, amount } = body;
    const com = communityList.find((c) => c.id === communityId);
    if (!com) return notFound('Community not found');
    const newPoll = {
      id: `poll-${Math.floor(Math.random() * 100000)}`,
      studentId,
      title,
      amount,
      votesFor: 0,
      votesAgainst: 0,
      status: 'open',
    };
    com.posts.unshift(newPoll);
    return created(newPoll);
  });
}

registerHandlers(mock);
registerHandlers(mockLocal);

export {};
