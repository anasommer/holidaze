import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '../../../utils/schema';

const UserRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    console.log(data);
  }

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
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-amber-500'
            id='username'
            type='text'
            placeholder='Username'
            {...register('name')}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='email'
          >
            E-mail
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-amber-500'
            id='email'
            type='text'
            placeholder='E-mail'
            {...register('email')}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className='mb-2'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='password'
          >
            Password
          </label>
          <input
            className='shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-amber-500'
            id='password'
            type='password'
            placeholder='Password'
            {...register('password')}
          />
          {errors.password && <p>{errors.password.message}</p>}
          {/* <p className='text-red-500 text-xs italic'>
          Please choose a password.
        </p> */}
        </div>

        <div className='mb-6'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='avatar'
          >
            Avatar
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-amber-500'
            id='avatar'
            type='text'
            placeholder='Url to avatar'
            {...register('avatar')}
          />
          {errors.avatar && <p>{errors.avatar.message}</p>}
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
    </div>
  );
};

export default UserRegister;
