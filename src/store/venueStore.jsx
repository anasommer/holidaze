import { create } from 'zustand';
import API_URL from '../utils/constants';

const useVenuesStore = create((set) => ({
  vanues: [],
  loading: true,
  error: null,
  fetchVenues: async () => {
    try {
      const response = await fetch(`${API_URL}venues?limit=20`);
      const data = await response.json();
      set({ venues: data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));

export default useVenuesStore;
