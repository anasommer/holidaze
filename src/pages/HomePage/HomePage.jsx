import VenueList from '../../components/venues/VenueList';

const HomePage = () => {
  return (
    <>
      <h1 className='text-center mt-10 '>Find a perfect getaway!</h1>
      <div className='mt-10 mb-10 flex justify-center min-h-screen '>
        <div className='w-full max-w-4xl px-2 sm:px-6 lg:px-8'>
          <VenueList />
        </div>
      </div>
    </>
  );
};

export default HomePage;
