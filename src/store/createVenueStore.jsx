import { create } from 'zustand';

const useCreateVenueStore = create((set) => ({
  formData: {
    name: '',
    description: '',
    media: 0,
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
      address: '',
      city: '',
      zip: '',
      country: '',
      continent: '',
      lat: 0,
      lng: 0,
    },
  },
  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
}));

export default useCreateVenueStore;
