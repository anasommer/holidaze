import { create } from 'zustand';
import API_URL from '../utils/constants';

const useVenueDetailStore = create((set) => ({
  venueData: null,
  loading: false,
  error: null,
  selectedImage: null,
  setSelectedImage: (image) => {
    set({ selectedImage: image });
  },

  fetchVenueDetails: async (venueId) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}venues/${venueId}`);
      const data = await response.json();
      set({ venueData: data, loading: false, selectedImage: data.media[0] });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useVenueDetailStore;
