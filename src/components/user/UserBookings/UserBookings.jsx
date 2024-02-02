import { useEffect, useState } from 'react';
import API_URL from '../../../utils/constants';
import useAuthStore from '../../../store/authStore';
import VenueInfo from './VenueInfo';

export const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { token, username } = useAuthStore();

  useEffect(() => {
    fetch(`${API_URL}profiles/${username}/bookings?_venue=true`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        Username: username,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }

        return response.json();
      })
      .then((data) => {
        setBookings(data);
      })
      .catch((error) => {
        console.error('Error fetching bookings:', error);
      });
  }, [token, username]);

  return (
    <div className='container mx-auto mt-5'>
      {bookings.length === 0 ? (
        <h1 className='text-xl font-medium text-center mb-4 text-red-600 w-[80%] m-auto'>
          Sorry, You don&apos;t have any bookings yet
        </h1>
      ) : (
        <>
          <h1 className='text-2xl font-semibold mb-5 text-center'>
            Your Bookings
          </h1>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 m-auto w-[80%]'>
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className='bg-white rounded-lg shadow-md p-4 border border-gray-300'
              >
                <h2 className='text-lg font-semibold'>{`Booking ID: ${booking.id}`}</h2>
                <p>{`From: ${new Date(
                  booking.dateFrom
                ).toLocaleDateString()}`}</p>
                <p>{`To: ${new Date(booking.dateTo).toLocaleDateString()}`}</p>
                <p>{`Number of Guests: ${booking.guests}`}</p>

                <VenueInfo venue={booking.venue} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
