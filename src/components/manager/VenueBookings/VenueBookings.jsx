import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuthStore from '../../../store/authStore';
import fetchVenueBookings from '../../../services/api/bookingManager';

const VenueBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { id } = useParams();
  const { token } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const bookingsData = await fetchVenueBookings(id, token);
        setBookings(bookingsData);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    loadBookings();
  }, [id, token]);

  return (
    <div className='container mx-auto mt-5 px-4'>
      <h1 className='text-2xl font-semibold mb-5 text-center'>Bookings</h1>
      {bookings.length > 0 ? (
        <div
          className={`grid ${
            bookings.length === 1
              ? 'place-items-center'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2'
          } gap-6 justify-center`}
        >
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className={`bg-white rounded-lg shadow-md p-4 border border-gray-300 mx-auto ${
                bookings.length > 1
                  ? 'w-full sm:max-w-md'
                  : 'w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5'
              }`}
            >
              <h2 className='text-lg font-semibold'>
                Booking ID: {booking.id}
              </h2>
              <p>From: {new Date(booking.dateFrom).toLocaleDateString()}</p>
              <p>To: {new Date(booking.dateTo).toLocaleDateString()}</p>
              <p>Number of Guests: {booking.guests}</p>

              <div className='flex flex-col items-center mt-4'>
                <button
                  className='bg-amber-400 text-black w-full font-bold py-2 px-4 rounded hover:bg-blue-700 mb-2'
                  onClick={() => navigate(`/venue/${id}`)}
                >
                  View Venue
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-center text-red-800 text-2xl font-bold mt-5 mb-4'>
          There are no bookings yet...
        </p>
      )}
    </div>
  );
};

export default VenueBookings;
