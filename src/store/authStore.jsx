import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isAuthorized: false,
  isVenueManager: false,
  initializeAuth: () => {
    const token = localStorage.getItem('token');
    const isManager = localStorage.getItem('isManager');
    if (token) {
      set({ isAuthorized: true, isVenueManager: isManager });
    }
  },

  login: (isManager = false) =>
    set({ isAuthorized: true, isVenueManager: isManager }),
  logout: () => set({ isAuthorized: false, isVenueManager: false }),
}));

export default useAuthStore;
