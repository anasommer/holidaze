import { create } from 'zustand';
import API_URL from '../utils/constants';

const useVenuesStore = create((set, get) => ({
  vanues: [],
  loading: true,
  error: null,
  currentPage: 0,
  limit: 24,
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  resetPagination: () => set({ currentPage: 0 }),
  fetchVenues: async () => {
    set({ loading: true });
    const { currentPage, limit } = get();
    const offset = currentPage * limit;

    try {
      const response = await fetch(
        `${API_URL}venues?limit=${limit}&offset=${offset}`
      );
      const data = await response.json();
      set({ venues: data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));

export default useVenuesStore;
