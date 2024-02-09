import { useState } from 'react';
import { debounce } from 'lodash';
import useVenuesStore from '../../../store/venueStore';

const Search = () => {
  const [searchInput, setSearchInput] = useState('');
  const setSearchQuery = useVenuesStore((state) => state.setSearchQuery);

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchInput(query);
    debouncedSetSearchQuery(query);
  };

  const debouncedSetSearchQuery = debounce((query) => {
    setSearchQuery(query);
  }, 300);

  return (
    <div className='flex justify-center mb-4'>
      <input
        type='text'
        placeholder='Search venues...'
        value={searchInput}
        onChange={handleSearchInputChange}
        className='border border-gray-400 px-4 py-2 w-[300px] md:w-[400px] max-w-md rounded-lg'
      />
    </div>
  );
};

export default Search;
