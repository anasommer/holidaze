import API_URL from '../../utils/constants';

export const createVenue = async (data, token) => {
  try {
    const response = await fetch(`${API_URL}venues`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error making API call:', error);
    throw error;
  }
};
