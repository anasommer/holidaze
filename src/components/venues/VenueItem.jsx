import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import useVenueDetailStore from '../../store/venueDetail';

const VenueItem = () => {
  const { id } = useParams();
  const {
    venueData,
    loading,
    error,
    fetchVenueDetails,
    selectedImage,
    setSelectedImage,
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

  console.log(venueData);

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
                <p className='text-lg text-gray-700 mt-2'>
                  {venueData.description}
                </p>
                <p className='text-lg text-red-600 font-bold mt-2'>
                  ${venueData.price} USD
                </p>
                <p className='text-lg text-gray-700 mt-2'>
                  Location: {venueData.location.city},{' '}
                  {venueData.location.country}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VenueItem;
