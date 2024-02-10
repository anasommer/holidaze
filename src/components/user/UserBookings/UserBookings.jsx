import { useEffect, useState } from 'react';
import useAuthStore from '../../../store/authStore';
import VenueInfo from './VenueInfo';
import fetchUserBookings from '../../../services/api/userBookings';

export const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { token, username } = useAuthStore();

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await fetchUserBookings(username, token);
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    loadBookings();
  }, [token, username]);

  return (
    <div className='container mx-auto mt-5'>
      {bookings.length === 0 ? (
        <h1 className='text-xl font-medium text-center mb-4 text-red-600 w-[80%] m-auto'>
          Sorry, you don&apos;t have any bookings yet.
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
