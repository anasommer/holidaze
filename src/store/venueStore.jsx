import { create } from 'zustand';
import API_URL from '../utils/constants';

const useVenuesStore = create((set) => ({
  venues: [],
  currentPage: 1,
  itemsPerPage: 24,
  loading: false,
  error: null,
  searchQuery: '',

  fetchAllVenues: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}venues`);
      const data = await response.json();
      set({ venues: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  getDisplayedVenues: () => {
    const { venues, currentPage, itemsPerPage, searchQuery } =
      useVenuesStore.getState();
    const filteredVenues = venues.filter((venue) =>
      venue.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredVenues.slice(startIndex, endIndex);
  },

  nextPage: () => {
    set((state) => {
      window.scrollTo(0, 0);
      return { currentPage: state.currentPage + 1 };
    });
  },

  prevPage: () => {
    set((state) => {
      window.scrollTo(0, 0);
      return { currentPage: Math.max(1, state.currentPage - 1) };
    });
  },

  pagination: { currentPage: 1 },

  resetPagination: () =>
    set((state) => ({ pagination: { ...state.pagination, currentPage: 1 } })),

  setSearchQuery: (query) => {
    set((state) => ({
      searchQuery: query,
      currentPage: 1,
    }));
  },
}));

export default useVenuesStore;
