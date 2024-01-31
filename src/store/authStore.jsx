import { create } from 'zustand';

const getLocalStorageItem = (key, defaultValue) =>
  localStorage.getItem(key) || defaultValue;

const defaultAvatarUrl = 'src/assets/images/user-avatar.jpeg';

const useAuthStore = create((set) => ({
  isAuthorized: false,
  isVenueManager: false,
  username: getLocalStorageItem('username', ''),
  avatarUrl: getLocalStorageItem('avatar', defaultAvatarUrl),

  initializeAuth: () => {
    const token = getLocalStorageItem('token', null);
    const isManager = getLocalStorageItem('isManager', 'false') === 'true';
    const username = getLocalStorageItem('username', '');

    if (token) {
      set({
        isAuthorized: true,
        isVenueManager: isManager,
        username,
        avatarUrl: getLocalStorageItem('avatar', defaultAvatarUrl),
      });
    }
  },

  login: (
    isManager = false,
    username = '',
    avatarUrl = getLocalStorageItem('avatar', defaultAvatarUrl)
  ) =>
    set({ isAuthorized: true, isVenueManager: isManager, username, avatarUrl }),

  logout: () => {
    set({
      isAuthorized: false,
      isVenueManager: false,
      username: '',
      avatarUrl: defaultAvatarUrl,
    });
    localStorage.clear();
  },
}));

export default useAuthStore;
