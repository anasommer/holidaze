import { create } from 'zustand';
import API_URL from '../utils/constants';

const useVenuesStore = create((set) => ({
  allVenues: [],
  currentPage: 1,
  itemsPerPage: 24,
  totalPages: 0,
  loading: false,
  error: null,

  fetchAllVenues: async () => {
    const { currentPage, itemsPerPage } = useVenuesStore.getState(); // Correctly accessing the current state
    set({ loading: true, error: null });
    try {
      const response = await fetch(
        `${API_URL}venues?limit=${itemsPerPage}&offset=${
          (currentPage - 1) * itemsPerPage
        }`
      );
      const totalCount = response.headers.get('X-Total-Count');
      const totalPages = Math.ceil(totalCount / itemsPerPage);
      const data = await response.json();
      set({
        allVenues: data,
        totalPages,
        loading: false,
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  setSearchQuery: (query) =>
    set((state) => {
      const filteredVenues = query
        ? state.allVenues.filter((venue) =>
            venue.name.toLowerCase().includes(query.toLowerCase())
          )
        : state.allVenues;
      return {
        searchQuery: query,
        displayedVenues: filteredVenues.slice(0, state.itemsPerPage),
        currentPage: 1,
      };
    }),

  setCurrentPage: (page) => set({ currentPage: page }),
}));

export default useVenuesStore;
