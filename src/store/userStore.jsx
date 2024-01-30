import { create } from 'zustand';

const useUserStore = create((set) => ({
  avatarUrl:
    localStorage.getItem('avatar') || 'src/assets/images/user-avatar.jpeg',
  setAvatarUrl: (url) => set({ avatarUrl: url }),
}));

export default useUserStore;
