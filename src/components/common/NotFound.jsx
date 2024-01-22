import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='flex justify-center my-14'>
      <div>
        <h2 className='text-center  text-3xl font-bold text-red-700 mb-3'>
          Sorry, page not found
        </h2>
        <Link
          to='.'
          className='text-center hover:cursor-pointer text-3xl font-bold text-blue-700 underline underline-offset-2'
        >
          Return to the Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
