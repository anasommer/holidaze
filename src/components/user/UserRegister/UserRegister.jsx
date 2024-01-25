import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '../../../utils/schema';
import useAuthStore from '../../../store/authStore';
import registerUser from '../../../services/api/authService';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const UserRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [registrationError, setRegistrationError] = useState('');

  const onSubmit = async (data) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const result = await registerUser(data);

      login(data.venueManager);
      navigate('/profile');
    } catch (error) {
      setRegistrationError('Registration failed: User already exists');
    }
  };

  return (
    <div className='w-full max-w-xs mx-auto my-10'>
      <h1 className='text-center mb-2 font-bold text-2xl'>Sign Up</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
      >
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='username'
          >
            Username
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.name ? 'border-red-500' : ''
            }`}
            id='username'
            type='text'
            placeholder='Username'
            {...register('name')}
          />
          {errors.name && (
            <p className='text-red-500 text-sm italic m-auto'>
              {errors.name.message}
            </p>
          )}
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='email'
          >
            E-mail
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.email ? 'border-red-500' : ''
            }`}
            id='email'
            type='text'
            placeholder='E-mail'
            {...register('email')}
          />
          {errors.email && (
            <p className='text-red-500 text-sm italic'>
              {errors.email.message}
            </p>
          )}
        </div>
        <div className='mb-2'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='password'
          >
            Password
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.password ? 'border-red-500' : ''
            }`}
            id='password'
            type='password'
            placeholder='Password'
            {...register('password')}
          />
          {errors.password && (
            <p className='text-red-500 text-sm italic'>
              {errors.password.message}
            </p>
          )}
        </div>

        <div className='mb-6'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='avatar'
          >
            Avatar
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.avatar ? 'border-red-500' : ''
            }`}
            id='avatar'
            type='text'
            placeholder='Url to avatar'
            {...register('avatar')}
          />
          {errors.avatar && (
            <p className='text-red-500 text-sm italic'>
              {errors.avatar.message}
            </p>
          )}
        </div>
        <div className='md:flex md:items-center mb-4'>
          <label className='  text-rose-800 font-semibold'>
            <input
              className='mr-2 leading-tight'
              type='checkbox'
              {...register('venueManager')}
            />
            <span className='text-sm'>Register as a Venue manager too</span>
          </label>
        </div>
        <div className='flex items-center justify-between'>
          <button className='bg-amber-400 hover:bg-green-500 hover:text-white text-black font-bold py-2 px-4 rounded w-full'>
            Sign Up
          </button>
        </div>
      </form>
      {registrationError && (
        <p className='text-red-500 text-md italic text-center'>
          {registrationError}
        </p>
      )}
    </div>
  );
};

export default UserRegister;
