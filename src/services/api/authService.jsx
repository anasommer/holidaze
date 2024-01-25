import API_URL from '../../utils/constants';

const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to register');
    }

    return await response.json();
  } catch (error) {
    console.error('Registration error', error);
    throw error;
  }
};

export default registerUser;
