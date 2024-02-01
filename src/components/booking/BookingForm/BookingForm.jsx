// BookingForm.jsx
import { useState } from 'react';

import useVenueDetailStore from '../../../store/venueDetail';
import useAuthStore from '../../../store/authStore';
import API_URL from '../../../utils/constants';

// eslint-disable-next-line react/prop-types
const BookingForm = ({ venueId, maxGuests }) => {
  const { dateRange } = useVenueDetailStore();
  const { token } = useAuthStore();
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const bookingUrl = `${API_URL}bookings`;

    try {
      const response = await fetch(bookingUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          dateFrom: dateRange.startDate,
          dateTo: dateRange.endDate,
          guests,
          venueId,
        }),
      });

      if (!response.ok) {
        throw new Error('Booking failed');
      }

      const result = await response.json();

      setError(null);
      setSuccess('Booking successful. Thank you!');
    } catch (error) {
      setError('Booking failed, did you choose available dates?');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex justify-center align-center flex-col m-auto w-[200px]'
    >
      <label
        htmlFor='guests'
        className='font-bold block mt-2 text-sm text-gray-700'
      >
        Number of guests:
      </label>
      <select
        id='guests'
        name='guests'
        value={guests}
        onChange={(e) => setGuests(parseInt(e.target.value, 10))}
        className='mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm w-28 justify-center ml-10 mb-2'
      >
        {/* Generate options from 1 to maxGuests */}
        {Array.from({ length: maxGuests }, (_, i) => i + 1).map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {/* Error message */}
      {error && <p className='text-red-500 ml-4 text-center'>{error}</p>}
      {/* Success message */}
      {success ? (
        <p className='text-green-600 ml-4 text-3xl font-bold'>{success}</p>
      ) : (
        <button
          type='submit'
          className='bg-amber-400 hover:bg-green-500 hover:text-white text-black font-bold py-2 px-4 rounded block mt-2  m-auto'
        >
          Book Venue
        </button>
      )}
    </form>
  );
};

export default BookingForm;
