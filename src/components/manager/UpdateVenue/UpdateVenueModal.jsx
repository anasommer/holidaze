import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createVenueSchema } from '../../../utils/schema';
import useAuthStore from '../../../store/authStore';
import API_URL from '../../../utils/constants';
import Modal from '../../../utils/modal';
import TextInput from '../../FormFields/TextInput';
import CheckboxGroup from '../../FormFields/CheckboxGroup';

const UpdateVenueModal = ({ isOpen, onClose, venueId, onUpdated }) => {
  const { token } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [originalMedia, setOriginalMedia] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createVenueSchema),
  });

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
        setOriginalMedia(data.media);
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
    if (
      Array.isArray(data.media) &&
      data.media.length > 0 &&
      Array.isArray(data.media[0])
    ) {
      data.media = data.media[0];
    }

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
          onSubmit={handleSubmit(onSubmit)}
          className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
        >
          <h1 className='text-center mt-4 mb-2 font-bold text-2xl'>
            Update Venue
          </h1>
          <div className='mb-4'>
            <TextInput
              isRequired
              register={register}
              name='name'
              label='Name'
              errors={errors}
              placeholder='Venue Name'
            />
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
            <TextInput
              register={register}
              name='media'
              label='Media'
              errors={errors}
              placeholder='Url to media'
            />
            <TextInput
              isRequired
              register={register}
              name='price'
              label='Price'
              errors={errors}
              placeholder='Price'
            />
            <TextInput
              isRequired
              register={register}
              name='maxGuests'
              label='Max Guests'
              errors={errors}
              placeholder='Max Guests number'
            />
            <TextInput
              register={register}
              name='rating'
              label='Rating'
              errors={errors}
              placeholder='Rating'
            />
            <CheckboxGroup register={register} />
            <TextInput
              register={register}
              name='location.city'
              label='City'
              errors={errors}
              placeholder='City'
            />
            <TextInput
              register={register}
              name='location.country'
              label='Country'
              errors={errors}
              placeholder='Country'
            />
          </div>
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
