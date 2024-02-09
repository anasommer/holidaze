import { useEffect } from 'react';
import useVenuesStore from '../../store/venueStore';
import VenueCard from './VenueCard';

const VenueList = () => {
  const {
    allVenues,
    fetchAllVenues,
    currentPage,
    setCurrentPage,

    loading,
    error,
  } = useVenuesStore();

  useEffect(() => {
    fetchAllVenues(currentPage).then(() => {
      window.scrollTo(0, 0);
    });
  }, [currentPage, fetchAllVenues]);

  if (loading) {
    return (
      <h3 className='text-center  text-3xl font-bold'>Loading venues...</h3>
    );
  }

  if (error) {
    return (
      <h3 className='text-center  text-3xl font-bold text-red-700'>
        Error: Something went wrong, try to refresh the page
      </h3>
    );
  }

  return (
    <div className='container mx-auto mt-5'>
      <h1 className='text-center text-3xl font-bold mb-6'>Our Venues</h1>

      {/* Loading Message */}
      {loading && (
        <h3 className='text-center text-3xl font-bold'>Loading venues...</h3>
      )}

      {/* Error Message */}
      {!loading && error && (
        <h3 className='text-center text-3xl font-bold text-red-700'>
          Error: Something went wrong, try to refresh the page
        </h3>
      )}

      {/* Venue Cards (conditionally rendered if not loading and no error) */}
      {!loading && !error && (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {allVenues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
          <div className='flex justify-center mt-4'>
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className='mr-4 py-2 px-3 bg-blue-500 text-white rounded-lg'
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className='py-2 px-3 bg-blue-500 text-white rounded-lg'
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
