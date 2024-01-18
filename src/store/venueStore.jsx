import { create } from 'zustand';
import API_URL from '../utils/constants';

const useVenuesStore = create((set) => ({
  allVenues: [],
  displayedVenues: [],
  searchQuery: '',
  currentPage: 1,
  itemsPerPage: 24,
  loading: false,
  error: null,

  fetchAllVenues: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}venues`);
      const data = await response.json();
      set({
        allVenues: data,
        displayedVenues: data.slice(0, 24),
        loading: false,
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  setSearchQuery: (query) => {
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
    });
  },

  setCurrentPage: (page) => {
    set((state) => {
      const startIndex = (page - 1) * state.itemsPerPage;
      const newDisplayedVenues = state.searchQuery
        ? state.allVenues
            .filter((venue) =>
              venue.name.toLowerCase().includes(state.searchQuery.toLowerCase())
            )
            .slice(startIndex, startIndex + state.itemsPerPage)
        : state.allVenues.slice(startIndex, startIndex + state.itemsPerPage);
      return { currentPage: page, displayedVenues: newDisplayedVenues };
    });
  },
}));

export default useVenuesStore;
