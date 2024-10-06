import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthenticationStore = create(persist(
  (set) => ({
    accessToken: null,
    refreshToken: null,

    setAccessToken: (token) => set({ accessToken: token }),
    setRefreshToken: (token) => set({ refreshToken: token }),

    logout: () => set({ accessToken: null, refreshToken: null }),
  }),
  {
    name: 'jwt-storage',
    getStorage: () => localStorage,
  }
));

export { useAuthenticationStore };
