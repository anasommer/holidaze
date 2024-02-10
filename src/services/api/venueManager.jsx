import API_URL from '../../utils/constants';

const fetchUserVenues = async (username, token) => {
  const response = await fetch(`${API_URL}profiles/${username}/venues`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch venues');
  }

  const data = await response.json();
  return data;
};

export default fetchUserVenues;
