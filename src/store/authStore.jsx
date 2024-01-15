import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isAuthorized: false,
  isVenueManager: false,
  login: (isManager = false) =>
    set({ isAuthorized: true, isVenueManager: isManager }),
  logout: () => set({ isAuthorized: false, isVenueManager: false }),
}));

export default useAuthStore;
