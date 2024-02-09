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
      <div className='container mx-auto mt-5'>
        <h3 className='text-center text-3xl font-bold'>Loading venues...</h3>
      </div>
    );

  if (error)
    return (
      <div className='container mx-auto mt-5'>
        <h3 className='text-center text-3xl font-bold text-red-700'>
          Error: {error}. Please try refreshing the page.
        </h3>
      </div>
    );

  return (
    <div className='container mx-auto mt-5'>
      <h1 className='text-center text-3xl font-bold mb-6'>Our Venues</h1>
      <div className='flex justify-center mb-4'>
        <Search />
      </div>

      {/* Display loading message if loading */}
      {loading && (
        <div className='text-center text-3xl font-bold'>Loading venues...</div>
      )}

      {/* Display error message if error */}
      {error && (
        <div className='text-center text-3xl font-bold text-red-700'>
          Error: {error} Please try refreshing the page.
        </div>
      )}

      {/* Display venue cards if no loading or error */}
      {!loading && !error && (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {displayedVenues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>

          <div className='flex justify-center mt-4'>
            {currentPage > 1 && (
              <button
                onClick={prevPage}
                className='mr-4 py-2 px-3 bg-blue-500 hover:bg-amber-400 hover:text-black text-white rounded-lg w-[100px]'
              >
                Previous
              </button>
            )}

            <button
              onClick={nextPage}
              className='py-2 px-3 bg-blue-500 hover:bg-amber-400 hover:text-black text-white rounded-lg w-[100px]'
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default VenueList;
