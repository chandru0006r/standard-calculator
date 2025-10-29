import { create } from 'zustand';
import api from '../lib/apiClient';

export const useStudentStore = create((set, get) => ({
  student: null,
  students: [],
  loans: [],
  communities: [],
  loading: false,
  error: null,

  fetchStudent: async (studentId = 'stu-001') => {
    set({ loading: true, error: null });
    try {
      const res = await api.get(`/student/${studentId}`);
      set({ student: res.data, loading: false });
    } catch (e) {
      set({ error: e?.response?.data?.message || e.message, loading: false });
    }
  },

  fetchStudents: async (mentorId) => {
    try {
      const res = await api.get(`/students${mentorId ? `?mentorId=${mentorId}` : ''}`);
      set({ students: res.data });
    } catch (e) { /* ignore */ }
  },

  fetchLoans: async () => {
    try {
      const res = await api.get('/loans');
      set({ loans: res.data });
    } catch (e) {
      // ignore for demo
    }
  },

  fetchCommunities: async () => {
    try {
      const res = await api.get('/communities');
      set({ communities: res.data });
    } catch (e) {
      // ignore for demo
    }
  },

  withdrawSEF: async (amount) => {
    const { student } = get();
    const res = await api.post('/sef/withdraw', { studentId: student.id, amount });
    set({ student: { ...student, sefBalance: res.data.balance } });
    return res.data;
  },

  applyLoan: async (payload) => {
    const res = await api.post('/loans/apply', payload);
    set({ loans: [res.data, ...get().loans] });
    return res.data;
  },

  mentorApproveLoan: async (loanId) => {
    const res = await api.post('/loans/mentor-approve', { loanId });
    set({ loans: get().loans.map(l => l.id === loanId ? res.data : l) });
    return res.data;
  },

  adminApproveLoan: async (loanId) => {
    const res = await api.post('/loans/admin-approve', { loanId });
    set({ loans: get().loans.map(l => l.id === loanId ? res.data : l) });
    return res.data;
  },

  fundLoan: async (loanId) => {
    const res = await api.post('/loans/fund', { loanId });
    set({ loans: get().loans.map(l => l.id === loanId ? res.data : l) });
    return res.data;
  },

  createCommunity: async (payload) => {
    const res = await api.post('/communities/create', payload);
    set({ communities: [res.data, ...get().communities] });
    return res.data;
  },

  joinCommunity: async (communityId, studentId) => {
    const res = await api.post('/communities/join', { communityId, studentId });
    set({ communities: get().communities.map(c => c.id === communityId ? res.data : c) });
    return res.data;
  },

  addMemberToCommunity: async (communityId, memberId) => {
    const res = await api.post('/communities/add-member', { communityId, memberId });
    set({ communities: get().communities.map(c => c.id === communityId ? res.data : c) });
    return res.data;
  },

  leaveCommunity: async (communityId, studentId) => {
    const res = await api.post('/communities/leave', { communityId, studentId });
    set({ communities: get().communities.map(c => c.id === communityId ? res.data : c) });
    return res.data;
  },

  sendCommunityMessage: async (communityId, text, studentId) => {
    const res = await api.post('/communities/message', { communityId, text, studentId });
    set({ communities: get().communities.map(c => c.id === communityId ? { ...c, posts: [...c.posts, res.data] } : c) });
    return res.data;
  },

  adminUpdateSEF: async ({ studentId, sefBalance, sefWithdrawalLimit }) => {
    const res = await api.post('/admin/sef/update', { studentId, sefBalance, sefWithdrawalLimit });
    set({ students: get().students.map(s => s.id === studentId ? res.data : s) });
    if (get().student?.id === studentId) {
      set({ student: res.data });
    }
    return res.data;
  },

  createPoll: async (payload) => {
    const res = await api.post('/communities/poll', payload);
    set({ communities: get().communities.map(c => c.id === payload.communityId ? { ...c, posts: [res.data, ...c.posts] } : c) });
    return res.data;
  },
}));
