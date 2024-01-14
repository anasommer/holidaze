import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isAuthorized: false,
  login: () => set({ isAuthorized: true }),
  logout: () => set({ isAuthorized: false }),
}));

export default useAuthStore;
