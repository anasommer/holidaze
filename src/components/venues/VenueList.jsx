import { useEffect, useRef } from 'react';
import useVenuesStore from '../../store/venueStore';
import VenueCard from './VenueCard';

const VenueList = () => {
  const { displayedVenues, fetchAllVenues, setCurrentPage, currentPage } =
    useVenuesStore();
  const listRef = useRef(null);

  useEffect(() => {
    fetchAllVenues().then(() => {
      window.scrollTo(0, 0);
    });
  }, [currentPage, fetchAllVenues]);

  const totalPages = Math.ceil(
    useVenuesStore.getState().allVenues.length /
      useVenuesStore.getState().itemsPerPage
  );

  return (
    <div>
      {/* Grid of venues */}
      <div
        ref={listRef}
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 '
      >
        {displayedVenues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>

      {/* Pagination buttons */}
      <div className='flex justify-center mt-4'>
        <button
          className='mr-4 py-2 px-3 bg-blue-500 hover:bg-amber-400 hover:text-black text-white rounded-lg w-[100px]'
          onClick={() => setCurrentPage(currentPage - 1)}
          hidden={currentPage === 1}
        >
          Previous
        </button>
        <button
          className='py-2 px-3 bg-blue-500 hover:bg-amber-400 hover:text-black text-white rounded-lg w-[100px]'
          onClick={() => setCurrentPage(currentPage + 1)}
          hidden={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default VenueList;
