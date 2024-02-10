import API_URL from '../../utils/constants.jsx';

const fetchVenueDetails = async (venueId, token) => {
  const response = await fetch(`${API_URL}venues/${venueId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw new Error('Failed to fetch venue details');
  return response.json();
};

const updateVenue = async (venueId, data, token) => {
  const response = await fetch(`${API_URL}venues/${venueId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

export { fetchVenueDetails, updateVenue };
