import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;

  login: () => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',

  login: () => {
    set({ isAuthenticated: true });
    localStorage.setItem('isAuthenticated', 'true');
  },

  logout: () => {
    set({ isAuthenticated: false });
    localStorage.removeItem('isAuthenticated');
  },
}));

export default useAuthStore;
