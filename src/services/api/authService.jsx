import API_URL from '../../utils/constants';

export const registerUser = async (userData) => {
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

export const loginApi = async (credentials) => {
  try {
    const response = await fetch(
      'https://api.noroff.dev/api/v1/holidaze/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to login');
    }

    return await response.json();
  } catch (error) {
    console.error('Login error', error);
    throw error;
  }
};
