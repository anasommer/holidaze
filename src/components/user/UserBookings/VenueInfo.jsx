const VenueInfo = ({ venue }) => {
  return (
    <div className='venue-info'>
      {venue && (
        <>
          <img
            src={
              venue.media && venue.media.length > 0
                ? venue.media
                : 'src/assets/images/venue.jpeg'
            }
            alt={venue.name}
            className='w-32 h-32 object-cover m-auto'
          />

          <a
            href={`/venue/${venue.id}`}
            className='bg-amber-400 hover:bg-green-500 hover:text-white text-black font-bold py-2 px-4 rounded block mt-2  m-auto text-center '
          >
            View Venue
          </a>
        </>
      )}
    </div>
  );
};

export default VenueInfo;
