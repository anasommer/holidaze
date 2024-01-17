const VenueCard = ({ venue }) => {
  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg'>
      {venue.media.length > 0 ? (
        <img
          className='w-full h-48 object-cover'
          src={venue.media[0]}
          alt={venue.name}
        />
      ) : (
        <img
          className='w-full h-48 object-cover'
          src='/src/assets/images/venue.jpeg'
          alt={venue.name}
        />
      )}

      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2'>{venue.name}</div>
        <p className='text-gray-700 text-base'>{venue.description}</p>
      </div>
      <div className='px-6 pt-4 pb-2'>
        {/* Add tags or additional info here */}
      </div>
    </div>
  );
};

export default VenueCard;
