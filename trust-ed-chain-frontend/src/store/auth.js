import { create } from 'zustand';

export const useAuthStore = create((set, get) => ({
  user: null,
  role: null, // 'student' | 'mentor' | 'admin' | 'investor'
  isAuthenticated: false,

  login: async ({ role = 'student', name = 'Demo User', id = 'demo-000' } = {}) => {
    const user = { id, name, email: `${name.toLowerCase().replace(/\s+/g,'')}@example.com`, role };
    set({ user, role, isAuthenticated: true });
    return user;
  },

  logout: () => set({ user: null, role: null, isAuthenticated: false }),
}));
