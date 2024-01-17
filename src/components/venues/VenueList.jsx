import { useEffect, useRef, useState } from 'react';
import useVenuesStore from '../../store/venueStore';
import VenueCard from './VenueCard';

const VenueList = () => {
  const { venues, loading, error, fetchVenues, currentPage, searchQuery } =
    useVenuesStore();
  const listRef = useRef(null);

  useEffect(() => {
    fetchVenues().then(() => {
      window.scrollTo(0, 0);
    });
  }, [currentPage, fetchVenues]);

  const goToNextPage = () => {
    useVenuesStore.setState((prev) => ({ currentPage: prev.currentPage + 1 }));
  };

  const goToPreviousPage = () => {
    useVenuesStore.setState((prev) => ({
      currentPage: prev.currentPage > 0 ? prev.currentPage - 1 : 0,
    }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading venues!</p>;

  const filteredVenues = venues.filter((venue) =>
    venue.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Grid of venues */}
      <div
        ref={listRef}
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 '
      >
        {filteredVenues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>

      {/* Pagination buttons */}
      <div className='flex justify-center mt-4'>
        <button
          className='mr-4 py-2 px-3 bg-blue-500 hover:bg-amber-400 hover:text-black text-white rounded-lg w-[100px]'
          onClick={goToPreviousPage}
          hidden={currentPage === 0}
        >
          Previous
        </button>
        <button
          className='py-2 px-3 bg-blue-500 hover:bg-amber-400 hover:text-black text-white rounded-lg w-[100px]'
          onClick={goToNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default VenueList;
