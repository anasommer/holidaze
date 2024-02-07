import useUserStore from '../../store/userStore';
import { schema } from '../../utils/schema';
import API_URL from '../../utils/constants';

const updateAvatarUrl = async (newAvatarUrl) => {
  try {
    await schema.validateAt('avatar', { avatar: newAvatarUrl });

    const accessToken = localStorage.getItem('token');
    if (!accessToken) {
      console.log('No access token found.');
      return;
    }

    const response = await fetch(
      `${API_URL}profiles/${localStorage.getItem('username')}/media`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ avatar: newAvatarUrl }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to update avatar.');
    }

    const data = await response.json();
    localStorage.setItem('avatar', data.avatar);
    useUserStore.getState().setAvatarUrl(data.avatar);

    return data.avatar;
  } catch (error) {
    console.error('Error updating avatar:', error);
  }
};

export default updateAvatarUrl;
