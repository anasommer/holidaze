import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import WifiIcon from '../../utils/icons/wifi';
import useVenueDetailStore from '../../store/venueDetail';
import ParkingIcon from '../../utils/icons/parking';
import BreakfastIcon from '../../utils/icons/breakfast';
import PetsIcon from '../../utils/icons/pets';
import StarRating from '../../utils/rating';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useAuthStore from '../../store/authStore';

const VenueItem = () => {
  const { id } = useParams();
  // eslint-disable-next-line no-unused-vars
  const { isAuthorized } = useAuthStore();
  const {
    venueData,
    loading,
    error,
    fetchVenueDetails,
    selectedImage,
    setSelectedImage,
    selectedDate,
    setSelectedDate,
  } = useVenueDetailStore();

  useEffect(() => {
    fetchVenueDetails(id);
  }, [id, fetchVenueDetails]);

  if (loading) {
    return (
      <h3 className='text-center text-3xl font-bold'>Loading venues...</h3>
    );
  }

  if (error) {
    return (
      <h3 className='text-center text-3xl font-bold text-red-700'>
        Error: Something went wrong, try to refresh the page
      </h3>
    );
  }

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <>
      {venueData && (
        <div className='py-6 px-4 sm:px-6 lg:px-8'>
          <div className='bg-stone-100  max-w-screen-xl mx-auto p-4 rounded overflow-hidden shadow-xl shadow-gray-400 text-center'>
            <div className='flex flex-col lg:flex-row items-center '>
              {/* Main Image */}
              <div className=' sm:w-1/4 md:w-2/4 lg:w-3/4 lg:pr-4 '>
                <img
                  src={
                    selectedImage ||
                    (venueData.media.length > 0
                      ? venueData.media[0]
                      : '/src/assets/images/venue.jpeg')
                  }
                  alt={venueData.name}
                  className='w-full h-auto md:h-35 lg:h-15 object-over rounded-md'
                />

                {/* Thumbnails (Visible on larger screens) */}
                {venueData.media.length > 1 && (
                  <div className='flex flex-wrap justify-center lg:justify-center '>
                    {venueData.media.map((image, index) => (
                      <div
                        key={index}
                        onClick={() => handleThumbnailClick(image)}
                        className='w-1/4 cursor-pointer p-2'
                      >
                        <img
                          src={image}
                          alt={venueData.name}
                          className='w-full h-auto object-cover rounded-md'
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Venue Information */}
              <div className='mt-8 text-center lg:text-left w-full'>
                <h1 className='text-4xl font-semibold'>{venueData.name}</h1>
                <p className='text-lg text-red-600 font-bold mt-1'>
                  ${venueData.price} USD{' '}
                  <span className='text-gray-500'>/ night</span>
                </p>
                <p className='text-lg text-gray-700 mt-2'>
                  <FontAwesomeIcon
                    icon={faMapLocationDot}
                    className=' mb-2 pr-2 mt-2'
                  />
                  {venueData.location.city}, {venueData.location.country}
                </p>{' '}
                <StarRating rating={venueData.rating} />
                <p className='mt-2'>
                  <span className='font-bold'>Max guests:</span>{' '}
                  {venueData.maxGuests}
                </p>
                {Object.values(venueData.meta).some((value) => value) && (
                  <div className='mt-2'>
                    <span className='font-bold '>Facilities:</span>
                    <div className='flex gap-3 pt-2 justify-center lg:justify-start'>
                      {' '}
                      {venueData.meta?.breakfast && <BreakfastIcon />}
                      {venueData.meta?.wifi && <WifiIcon />}
                      {venueData.meta?.parking && <ParkingIcon />}
                      {venueData.meta?.pets && <PetsIcon />}
                    </div>
                  </div>
                )}
                <div className=' text-gray-700 mt-2'>
                  <h2 className='font-bold'>Description:</h2>
                  <p> {venueData.description}</p>
                </div>
                {/* Render the calendar for authorized users */}
                {isAuthorized && (
                  <div>
                    <h3 className='font-bold mt-3'>Check availability:</h3>
                    <DatePicker
                      showIcon
                      selected={selectedDate}
                      onChange={(selectedDate) => setSelectedDate(selectedDate)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VenueItem;
