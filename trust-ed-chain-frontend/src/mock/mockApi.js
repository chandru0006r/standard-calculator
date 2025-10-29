import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import studentsData from './students.json';
import loansData from './loans.json';
import communitiesData from './communities.json';
import sefTransactionsData from './sefTransactions.json';

export const api = axios.create({ baseURL: '/api' });

const mock = new MockAdapter(api, { delayResponse: 400 });

let students = [...studentsData];
let loans = [...loansData];
let communities = [...communitiesData];
let sefTx = [...sefTransactionsData];

// Auth
mock.onPost('/auth/login').reply(config => {
  const { email, role } = JSON.parse(config.data || '{}');
  const student = students.find(s => s.email === email) || students[0];
  const user = { ...student, role: role || student.role };
  return [200, { user }];
});

// Student and profile
mock.onGet('/student').reply(200, { student: students[0] });
mock.onGet(/\/student\/([\w-]+)/).reply(config => {
  const id = config.url.split('/').pop();
  const student = students.find(s => s.id === id);
  return student ? [200, { student }] : [404, { message: 'Not Found' }];
});

// SEF
mock.onGet('/sef/transactions').reply(200, { transactions: sefTx });
mock.onPost('/sef/withdraw').reply(config => {
  const { studentId, amount } = JSON.parse(config.data || '{}');
  const student = students.find(s => s.id === studentId);
  if (!student) return [404, { message: 'Student not found' }];
  if (amount <= 0) return [400, { message: 'Invalid amount' }];
  const remainingLimit = Math.max(0, (student.sefWithdrawalLimit || 0));
  if (amount > remainingLimit || amount > student.sefBalance) {
    return [400, { message: 'Withdrawal exceeds limit or balance' }];
  }
  student.sefBalance -= amount;
  sefTx.unshift({ id: `tx-${Date.now()}`, studentId, type: 'withdrawal', amount, date: new Date().toISOString().slice(0,10) });
  return [200, { success: true, balance: student.sefBalance }];
});

// Communities
mock.onGet('/communities').reply(200, { communities });
mock.onPost('/communities').reply(config => {
  const { name, description, ownerId } = JSON.parse(config.data || '{}');
  const newCommunity = { id: `com-${Date.now()}`, name, description, members: [ownerId], microPolls: [] };
  communities.unshift(newCommunity);
  return [200, { community: newCommunity }];
});
mock.onPost(/\/communities\/([\w-]+)\/join/).reply(config => {
  const id = config.url.split('/')[2];
  const { studentId } = JSON.parse(config.data || '{}');
  const community = communities.find(c => c.id === id);
  if (!community) return [404, { message: 'Not Found' }];
  if (!community.members.includes(studentId)) community.members.push(studentId);
  return [200, { community }];
});
mock.onPost(/\/communities\/([\w-]+)\/polls/).reply(config => {
  const id = config.url.split('/')[2];
  const { studentId, title, amount } = JSON.parse(config.data || '{}');
  const community = communities.find(c => c.id === id);
  if (!community) return [404, { message: 'Not Found' }];
  const poll = { id: `poll-${Date.now()}`, studentId, title, amount, votesFor: 0, votesAgainst: 0, status: 'open' };
  community.microPolls.unshift(poll);
  return [200, { poll }];
});
mock.onPost(/\/polls\/([\w-]+)\/vote/).reply(config => {
  const pollId = config.url.split('/')[2];
  const { vote } = JSON.parse(config.data || '{}');
  communities.forEach(comm => {
    const poll = comm.microPolls.find(p => p.id === pollId);
    if (poll) {
      if (vote === 'for') poll.votesFor += 1; else poll.votesAgainst += 1;
    }
  });
  return [200, { success: true }];
});

// Loans
mock.onGet('/loans').reply(200, { loans });
mock.onPost('/loans').reply(config => {
  const { studentId, amount, purpose } = JSON.parse(config.data || '{}');
  const loan = { id: `loan-${Date.now()}`, studentId, amount, purpose, status: 'pending', mentorId: null, investorInterest: 0, funded: 0 };
  loans.unshift(loan);
  return [200, { loan }];
});
mock.onPost(/\/loans\/([\w-]+)\/fund/).reply(config => {
  const id = config.url.split('/')[2];
  const { amount } = JSON.parse(config.data || '{}');
  const loan = loans.find(l => l.id === id);
  if (!loan) return [404, { message: 'Not Found' }];
  loan.funded += amount;
  loan.status = loan.funded >= loan.amount ? 'funded' : loan.status;
  return [200, { loan }];
});

export default mock;
