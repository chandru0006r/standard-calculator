import { create } from 'zustand';
import { api } from '../mock/mockApi';

export const useAppStore = create((set, get) => ({
  user: null,
  student: null,
  loans: [],
  communities: [],
  sefTransactions: [],
  wallet: { connected: false, address: null },

  // Auth
  login: async ({ email, role }) => {
    const { data } = await api.post('/auth/login', { email, role });
    set({ user: data.user });
    await get().bootstrap();
  },

  logout: () => set({ user: null, wallet: { connected: false, address: null } }),

  // Bootstrap data
  bootstrap: async () => {
    const [studentRes, loansRes, commRes, txRes] = await Promise.all([
      api.get('/student'),
      api.get('/loans'),
      api.get('/communities'),
      api.get('/sef/transactions'),
    ]);
    set({
      student: studentRes.data.student,
      loans: loansRes.data.loans,
      communities: commRes.data.communities,
      sefTransactions: txRes.data.transactions,
    });
  },

  // SEF
  withdrawFromSEF: async (amount) => {
    const { student } = get();
    const { data } = await api.post('/sef/withdraw', { studentId: student.id, amount });
    set(state => ({
      student: { ...state.student, sefBalance: data.balance },
      sefTransactions: [
        { id: `tx-${Date.now()}`, studentId: student.id, type: 'withdrawal', amount, date: new Date().toISOString().slice(0,10) },
        ...state.sefTransactions,
      ],
    }));
    return data;
  },

  // Communities
  createCommunity: async (form) => {
    const { user } = get();
    const { data } = await api.post('/communities', { ...form, ownerId: user?.id });
    set(state => ({ communities: [data.community, ...state.communities] }));
  },
  joinCommunity: async (communityId) => {
    const { user } = get();
    const { data } = await api.post(`/communities/${communityId}/join`, { studentId: user?.id });
    set(state => ({
      communities: state.communities.map(c => c.id === communityId ? data.community : c)
    }));
  },
  createMicroPoll: async (communityId, payload) => {
    const { user } = get();
    const { data } = await api.post(`/communities/${communityId}/polls`, { ...payload, studentId: user?.id });
    set(state => ({
      communities: state.communities.map(c => c.id === communityId ? { ...c, microPolls: [data.poll, ...c.microPolls] } : c)
    }));
  },
  votePoll: async (pollId, vote) => {
    await api.post(`/polls/${pollId}/vote`, { vote });
  },

  // Loans
  applyForLoan: async (payload) => {
    const { user } = get();
    const { data } = await api.post('/loans', { ...payload, studentId: user?.id });
    set(state => ({ loans: [data.loan, ...state.loans] }));
  },
  fundLoan: async (loanId, amount) => {
    const { data } = await api.post(`/loans/${loanId}/fund`, { amount });
    set(state => ({ loans: state.loans.map(l => l.id === loanId ? data.loan : l) }));
  },

  // Wallet (mock)
  connectWallet: async () => {
    // Mock an address
    const address = `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`;
    set({ wallet: { connected: true, address } });
  },
  disconnectWallet: () => set({ wallet: { connected: false, address: null } }),
}));
