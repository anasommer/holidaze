import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createVenueSchema } from '../../../utils/schema';
import useAuthStore from '../../../store/authStore';
import { createVenue } from '../../../services/api/venueService';
import { useNavigate } from 'react-router-dom';
import TextInput from '../../FormFields/TextInput';
import CheckboxGroup from '../../FormFields/CheckboxGroup';

const CreateVenueForm = () => {
  const navigate = useNavigate();
  const [formSuccess, setFormSuccess] = useState(false);
  const { token } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(createVenueSchema),
  });

  useEffect(() => {
    return () => reset();
  }, [reset]);

  const onSubmit = async (data) => {
    try {
      const result = await createVenue(data, token);
      setFormSuccess(true);
      setTimeout(() => navigate(`/venue/${result.id}`), 2000);
    } catch (error) {
      console.error('Error making API call:', error);
    }
  };

  if (formSuccess) {
    return (
      <div className='w-full max-w-xs mx-auto my-10'>
        <h1 className='text-center mb-2 font-bold text-2xl text-green-800'>
          New venue is created! Redirecting...
        </h1>
      </div>
    );
  }

  return (
    <div className='md:max-w-[40%] m-auto'>
      <h1 className='text-center mt-4 mb-2 font-bold text-2xl'>Create Venue</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
      >
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
        <div className='flex justify-center mt-4'>
          <button
            className='bg-amber-400 hover:bg-green-500 hover:text-white text-black font-bold py-2 px-4 rounded'
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
