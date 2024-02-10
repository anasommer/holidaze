import API_URL from '../../utils/constants';

const fetchVenueBookings = async (venueId, token) => {
  const response = await fetch(`${API_URL}venues/${venueId}?_bookings=true`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch bookings');
  }

  const data = await response.json();
  return data.bookings;
};

export default fetchVenueBookings;
