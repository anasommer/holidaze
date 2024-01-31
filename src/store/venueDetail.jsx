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
  selectedDate: new Date(),
  setSelectedDate: (date) => {
    set({ selectDate: date });
  },
  disabledDates: [],
  dateRange: { startDate: null, endDate: null },
  setDateRange: (range) => set({ dateRange: range }),

  fetchVenueDetails: async (venueId) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(
        `${API_URL}venues/${venueId}?_bookings=true`
      );
      const data = await response.json();
      const disabledDates = data.bookings.flatMap((booking) =>
        generateDateRange(new Date(booking.dateFrom), new Date(booking.dateTo))
      );

      console.log(data.bookings);
      set({
        venueData: data,
        loading: false,
        selectedImage: data.media[0],
        disabledDates,
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

const generateDateRange = (start, end) => {
  const dates = [];
  let currentDate = start;

  while (currentDate <= end) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};

export default useVenueDetailStore;
