import API_URL from '../../utils/constants';

export const createBooking = async (token, bookingDetails) => {
  const bookingUrl = `${API_URL}bookings`;

  try {
    const response = await fetch(bookingUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookingDetails),
    });

    if (!response.ok) {
      throw new Error('Booking failed');
    }

    const result = await response.json();
    return {
      success: true,
      message: 'Booking successful. Thank you!',
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Booking failed, did you choose available dates?',
    };
  }
};
