import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createVenueSchema } from '../../../utils/schema';
import useAuthStore from '../../../store/authStore';
import useCreateVenueStore from '../../../store/createVenueStore';
import API_URL from '../../../utils/constants';

const CreateVenueForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createVenueSchema),
  });
  const { token } = useAuthStore();
  const { setFormData } = useCreateVenueStore();

  useEffect(() => {
    return () => setFormData({});
  }, [setFormData]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${API_URL}venues`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
    } catch (error) {
      console.error('Error making API call:', error);
    }
  };

  return (
    <div className=' md:max-w-[40%] m-auto'>
      <h1 className='text-center mt-4 mb-2 font-bold text-2xl'>Create Venue</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 m-auto mt-3'
      >
        <div className='mb-4 m-auto lg:max-w-[80%]'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='name'
          >
            Name <span className='text-red-500'>*</span>
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.name ? 'border-red-500' : ''
            }`}
            id='name'
            type='text'
            placeholder='Venue Name'
            {...register('name')}
          />
          {errors.name && (
            <p className='text-red-500 text-sm italic'>{errors.name.message}</p>
          )}
        </div>
        <div className='mb-4 lg:max-w-[80%] m-auto'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='description'
          >
            Description <span className='text-red-500'>*</span>
          </label>
          <textarea
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.description ? 'border-red-500' : ''
            }`}
            id='description'
            type='text'
            placeholder='Description'
            {...register('description')}
          />
          {errors.description && (
            <p className='text-red-500 text-sm italic'>
              {errors.description.message}
            </p>
          )}
        </div>
        <div className='mb-4 lg:max-w-[80%] m-auto'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='media'
          >
            Media
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='media'
            type='text'
            placeholder='Url to media'
          />
        </div>
        <div className='mb-4 lg:max-w-[80%] m-auto'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='price'
          >
            Price <span className='text-red-500'>*</span>
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.price ? 'border-red-500' : ''
            }`}
            id='price'
            type='text'
            placeholder='Price'
            {...register('price')}
          />
          {errors.price && (
            <p className='text-red-500 text-sm italic'>
              {errors.price.message}
            </p>
          )}
        </div>
        <div className='mb-4 lg:max-w-[80%] m-auto'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='maxGuests'
          >
            Max Guests <span className='text-red-500'>*</span>
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.maxGuests ? 'border-red-500' : ''
            }`}
            id='maxGuests'
            type='text'
            placeholder='Max Guests number'
            {...register('maxGuests')}
          />
          {errors.maxGuests && (
            <p className='text-red-500 text-sm italic'>
              {errors.maxGuests.message}
            </p>
          )}
        </div>
        <div className='mb-4 lg:max-w-[80%] m-auto'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='rating'
          >
            Rating
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='rating'
            type='text'
            placeholder='Rating'
            {...register('rating')}
          />
        </div>

        <div className='mb-4 lg:max-w-[80%] m-auto'>
          <div className='block text-gray-700 text-sm font-bold mb-2'>
            Facilities
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex items-center'>
              <input
                type='checkbox'
                className='form-checkbox h-5 w-5 text-amber-600 mr-2'
                {...register('meta.wifi')}
              />
              <span className='text-gray-700'>Wifi</span>
            </div>
            <div className='flex items-center'>
              <input
                type='checkbox'
                className='form-checkbox h-5 w-5 text-amber-600 mr-2'
                {...register('meta.breakfast')}
              />
              <span className='text-gray-700'>Breakfast</span>
            </div>
            <div className='flex items-center'>
              <input
                type='checkbox'
                className='form-checkbox h-5 w-5 text-amber-600 mr-2'
                {...register('meta.parking')}
              />
              <span className='text-gray-700'>Parking</span>
            </div>
            <div className='flex items-center'>
              <input
                type='checkbox'
                className='form-checkbox h-5 w-5 text-amber-600 mr-2'
                {...register('meta.pets')}
              />
              <span className='text-gray-700'>Pets</span>
            </div>
          </div>
        </div>
        <div className='flex justify-center mt-4 lg:max-w-[80%] m-auto'>
          <button
            className='w-full bg-amber-400 hover:bg-green-500 hover:text-white text-black font-bold py-2 px-4 rounded'
            type='submit'
          >
            Create Venue
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateVenueForm;
