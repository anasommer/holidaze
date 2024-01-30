import { useState } from 'react';
import updateAvatarUrl from '../../../services/api/updateAvatar';
import useUserStore from '../../../store/userStore';

const UserProfile = () => {
  const [newAvatarUrl, setNewAvatarUrl] = useState('');
  const [error, setError] = useState('');
  const avatarUrl = useUserStore((state) => state.avatarUrl);

  const handleSubmit = async () => {
    if (!newAvatarUrl.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    try {
      const updatedAvatarUrl = await updateAvatarUrl(newAvatarUrl);
      useUserStore.getState().setAvatarUrl(updatedAvatarUrl);
    } catch (error) {
      setError(error.message);
    }
    setNewAvatarUrl('');
    setError('');
  };

  return (
    <div className='flex flex-col max-w-sm rounded overflow-hidden shadow-xl shadow-gray-400 text-center my-4 m-auto'>
      <div className='flex-grow p-4'>
        <div className='font-bold text-xl mb-2 '>
          {localStorage.getItem('username')}
        </div>

        <img
          className='size-32 md:size-40 m-auto rounded'
          src={avatarUrl}
          alt={`User's avatar`}
        />

        <label
          className='block text-gray-700 text-sm font-bold mt-2 mb-1'
          htmlFor='avatar'
        >
          Update avatar:
        </label>
        <input
          className='shadow appearance-none border rounded w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          id='avatar'
          type='text'
          value={newAvatarUrl}
          placeholder='Url to new avatar'
          onChange={(e) => setNewAvatarUrl(e.target.value)}
        />
        <button
          className='bg-amber-400 hover:bg-green-500 hover:text-white text-black font-bold py-2 px-4 rounded block mt-2  m-auto'
          onClick={handleSubmit}
          disabled={!newAvatarUrl.trim()}
        >
          Update
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default UserProfile;
