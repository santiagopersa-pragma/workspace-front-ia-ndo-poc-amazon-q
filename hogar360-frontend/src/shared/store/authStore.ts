import { create } from 'zustand';
import type { AuthState, User } from '../interfaces/types';

interface AuthStore extends AuthState {
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user: User) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));