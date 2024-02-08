import { useEffect, useState } from 'react';
import API_URL from '../../../utils/constants';
import useAuthStore from '../../../store/authStore';
import { useNavigate } from 'react-router-dom';

const VenueManagement = () => {
  const [venues, setVenues] = useState([]);
  const { token, username } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}profiles/${username}/venues`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch venues');
        }

        return response.json();
      })
      .then((data) => {
        setVenues(data);
      })
      .catch((error) => {
        console.error('Error fetching venues:', error);
      });
  }, [token, username]);

  return (
    <div className='container mx-auto mt-5'>
      {venues.length === 0 ? (
        <h1 className='text-xl font-medium text-center mb-4 text-red-600 w-[80%] m-auto'>
          Sorry, you don't own any venues yet.
        </h1>
      ) : (
        <>
          <h1 className='text-2xl font-semibold mb-5 text-center'>
            Manage Your Venues
          </h1>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 md:gap-10 m-auto w-[80%] lg:w-[50%] '>
            {venues.map((venue) => (
              <div
                key={venue.id}
                className='bg-white rounded-lg shadow-md p-4 border border-gray-300'
              >
                <h2 className='text-lg font-semibold mb-3'>{venue.name}</h2>
                <img
                  src={venue.media}
                  alt={venue.name}
                  className='w-full h-40 object-cover rounded-md'
                />

                <div className='flex flex-col justify-center items-center mt-4 space-y-2'>
                  <button
                    className='bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 w-full mb-3 mt-3'
                    onClick={() => navigate(`/venues/${venue.id}/bookings`)}
                  >
                    View Bookings
                  </button>
                  <button
                    className='bg-amber-400 text-black font-bold py-2 px-4 rounded hover:bg-green-700 w-full'
                    onClick={() => navigate(`/venue/${venue.id}`)}
                  >
                    View Venue
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default VenueManagement;
