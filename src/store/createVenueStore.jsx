import { create } from 'zustand';

const useVenueFormStore = create((set) => ({
  formData: {
    name: '',
    description: '',
    media: [],
    price: 0,
    maxGuests: 0,
    rating: 0,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      city: 'Unknown',
      country: 'Unknown',
    },
  },
  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  resetFormData: () =>
    set({
      formData: {
        name: '',
        description: '',
        media: [],
        price: 0,
        maxGuests: 0,
        rating: 0,
        meta: {
          wifi: false,
          parking: false,
          breakfast: false,
          pets: false,
        },
        location: {
          city: 'Unknown',
          country: 'Unknown',
        },
      },
    }),
}));

export default useVenueFormStore;
