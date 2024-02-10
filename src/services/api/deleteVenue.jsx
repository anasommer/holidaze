import API_URL from '../../utils/constants';

const deleteVenue = async (venueId, token) => {
  const response = await fetch(`${API_URL}venues/${venueId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete the venue');
  }

  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }

  return null;
};
export default deleteVenue;
