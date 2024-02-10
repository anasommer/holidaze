import API_URL from '../../utils/constants';

const fetchUserBookings = async (username, token) => {
  const response = await fetch(
    `${API_URL}profiles/${username}/bookings?_venue=true`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch bookings');
  }

  return response.json();
};

export default fetchUserBookings;
