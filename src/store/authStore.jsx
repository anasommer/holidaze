import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isAuthorized: false,
  isVenueManager: false,
  username: localStorage.getItem('username') || '',
  avatarUrl:
    localStorage.getItem('avatar') || 'src/assets/images/user-avatar.jpeg',

  initializeAuth: () => {
    const token = localStorage.getItem('token');
    const isManager = localStorage.getItem('isManager') === 'true';
    const username = localStorage.getItem('username') || '';
    const avatarUrl =
      localStorage.getItem('avatar') || 'src/assets/images/user-avatar.jpeg';

    if (token) {
      set({
        isAuthorized: true,
        isVenueManager: isManager,
        username,
        avatarUrl,
      });
    }
  },

  login: (
    isManager = false,
    username = '',
    avatarUrl = localStorage.getItem('avatar') ||
      'src/assets/images/user-avatar.jpeg'
  ) =>
    set({ isAuthorized: true, isVenueManager: isManager, username, avatarUrl }),

  logout: () => {
    set({
      isAuthorized: false,
      isVenueManager: false,
      username: '',
    });
    localStorage.clear();
  },
}));

export default useAuthStore;
