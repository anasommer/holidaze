import { useEffect } from 'react';
import useVenuesStore from '../../store/venueStore';
import VenueCard from './VenueCard';
import Search from '../common/Search/Search';

const VenueList = () => {
  const {
    getDisplayedVenues,
    fetchAllVenues,
    nextPage,
    prevPage,
    currentPage,
    totalPages,

    loading,
    error,
  } = useVenuesStore();

  const displayedVenues = getDisplayedVenues();

  useEffect(() => {
    fetchAllVenues().then(() => {
      window.scrollTo(0, 0);
    });
  }, [fetchAllVenues]);

  if (loading)
    return (
      <h3 className='text-center  text-3xl font-bold'>Loading venues...</h3>
    );
  if (error)
    return (
      <h3 className='text-center  text-3xl font-bold text-red-700'>
        Error: Something went wrong, try to refresh the page
      </h3>
    );

  return (
    <div className='container mx-auto mt-5'>
      <h1 className='text-center text-3xl font-bold mb-6'>Our Venues</h1>
      <div className='flex justify-center mb-4'>
        <Search />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {displayedVenues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
      <div className='flex justify-center mt-4'>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
  );
};

export default VenueList;
