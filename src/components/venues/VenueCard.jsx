const VenueCard = ({ venue }) => {
  return (
    <div className='flex flex-col max-w-sm rounded overflow-hidden shadow-xl shadow-gray-400'>
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

      <div className='flex-grow p-4'>
        <div className='font-bold text-xl mb-2'>{venue.name}</div>
        <p className='text-gray-700 text-base h-24 overflow-hidden'>
          {venue.description}
        </p>
      </div>
      <div className='p-4'>
        <button className='bg-amber-400 hover:bg-green-500 text-black font-bold py-2 px-4 rounded w-full'>
          View Venue
        </button>
      </div>
    </div>
  );
};

export default VenueCard;
