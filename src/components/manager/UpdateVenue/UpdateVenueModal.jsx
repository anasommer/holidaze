import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createVenueSchema } from '../../../utils/schema';
import useAuthStore from '../../../store/authStore';
import API_URL from '../../../utils/constants';
import Modal from '../../../utils/modal';

const UpdateVenueModal = ({ isOpen, onClose, venueId, onUpdated }) => {
  const { token } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm({
    resolver: yupResolver(createVenueSchema),
  });

  // Fetch venue details and reset form
  useEffect(() => {
    async function fetchVenueDetails() {
      if (!venueId) return;
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}venues/${venueId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) throw new Error('Failed to fetch venue details');
        const data = await response.json();
        reset(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (isOpen) {
      fetchVenueDetails();
    }
  }, [isOpen, venueId, token, reset]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${API_URL}venues/${venueId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      onUpdated();
      onClose();
    } catch (error) {
      console.error('Error updating venue:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        reset();
        onClose();
      }}
      showCloseButton={true}
    >
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form
          key={venueId}
          onSubmit={handleSubmit(onSubmit)}
          className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
        >
          <h1 className='text-center mt-4 mb-2 font-bold text-2xl'>
            Update Venue
          </h1>

          {/* Name Field */}
          <div className='mb-4'>
            <label
              htmlFor='name'
              className='block text-gray-700 text-sm font-bold mb-2'
            >
              Name <span className='text-red-500'>*</span>
            </label>
            <input
              {...register('name')}
              className={`shadow appearance-none border ${
                errors.name ? 'border-red-500' : 'rounded'
              } w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              placeholder='Venue Name'
            />
            {errors.name && (
              <p className='text-red-500 text-xs italic'>
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Description Field */}
          <div className='mb-4'>
            <label
              htmlFor='description'
              className='block text-gray-700 text-sm font-bold mb-2'
            >
              Description <span className='text-red-500'>*</span>
            </label>
            <textarea
              {...register('description')}
              className={`shadow appearance-none border ${
                errors.description ? 'border-red-500' : 'rounded'
              } w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              placeholder='Description'
            />
            {errors.description && (
              <p className='text-red-500 text-xs italic'>
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Price Field */}
          <div className='mb-4'>
            <label
              htmlFor='price'
              className='block text-gray-700 text-sm font-bold mb-2'
            >
              Price <span className='text-red-500'>*</span>
            </label>
            <input
              {...register('price')}
              type='number'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='Price'
            />
            {errors.price && (
              <p className='text-red-500 text-xs italic'>
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Max Guests Field */}
          <div className='mb-4'>
            <label
              htmlFor='maxGuests'
              className='block text-gray-700 text-sm font-bold mb-2'
            >
              Max Guests <span className='text-red-500'>*</span>
            </label>
            <input
              {...register('maxGuests')}
              type='number'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='Max Guests'
            />
            {errors.maxGuests && (
              <p className='text-red-500 text-xs italic'>
                {errors.maxGuests.message}
              </p>
            )}
          </div>

          {/* City Field */}
          <div className='mb-4'>
            <label
              htmlFor='city'
              className='block text-gray-700 text-sm font-bold mb-2'
            >
              City
            </label>
            <input
              {...register('location.city')}
              type='text'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='City'
            />
            {errors.city && (
              <p className='text-red-500 text-xs italic'>
                {errors.location.city.message}
              </p>
            )}
          </div>
          {/* Country Field */}
          <div className='mb-4'>
            <label
              htmlFor='country'
              className='block text-gray-700 text-sm font-bold mb-2'
            >
              Country
            </label>
            <input
              {...register('location.country')}
              type='text'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='Max Guests'
            />
            {errors.country && (
              <p className='text-red-500 text-xs italic'>
                {errors.location.country.message}
              </p>
            )}
          </div>
          {/* Submit Button */}
          <div className='flex items-center justify-between'>
            <button
              type='submit'
              className='bg-amber-400 hover:bg-green-500 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            >
              Update Venue
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default UpdateVenueModal;
