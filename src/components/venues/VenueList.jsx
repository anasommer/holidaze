import { useEffect } from 'react';
import useVenuesStore from '../../store/venueStore';
import VenueCard from './VenueCard';

const VenueList = () => {
  const { venues, loading, error, fetchVenues } = useVenuesStore();

  useEffect(() => {
    fetchVenues();
  }, [fetchVenues]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading venues!</p>;

  console.log(venues);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {venues.map((venue) => (
        <VenueCard key={venue.id} venue={venue} />
      ))}
    </div>
  );
};

export default VenueList;
