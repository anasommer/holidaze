import StarRating from '../../utils/rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';

const VenueCard = ({ venue }) => {
  return (
    <div className='flex flex-col max-w-sm rounded overflow-hidden shadow-xl shadow-gray-400 text-center'>
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

      <div className='flex-grow p-4 '>
        <div className='font-bold text-xl mb-2 '>{venue.name}</div>
        <FontAwesomeIcon icon={faMapLocationDot} className=' mb-2' />{' '}
        {venue.location.country}
        <p className='text-gray-700 text-base h-18 overflow-hidden '>
          <span className='text-2xl font-bold tracking-tight text-red-600'>
            ${venue.price}
          </span>{' '}
          <span className='text-sm font-semibold leading-6 tracking-wide text-gray-500'>
            USD
          </span>
        </p>
        <StarRating rating={venue.rating} />
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
