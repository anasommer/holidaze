import { useForm } from 'react-hook-form';
import useAuthStore from '../../../store/authStore';
import { loginApi } from '../../../services/api/authService';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const {
    register,
    handleSubmit,

    // eslint-disable-next-line no-unused-vars
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const onSubmit = async (data) => {
    try {
      const response = await loginApi(data);

      if (response.accessToken) {
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('isManager', response.venueManager);
        localStorage.setItem('username', response.name);
        localStorage.setItem('avatar', response.avatar);

        login(response.venueManager);

        navigate('/profile');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className='w-full max-w-xs mx-auto my-10'>
      <h1 className='text-center mb-2 font-bold text-2xl'>Login</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
      >
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
        </div>
        <div className='mb-6'>
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
        </div>
        <div className='flex items-center justify-between'>
          <button className='bg-amber-400 hover:bg-green-500 hover:text-white text-black font-bold py-2 px-4 rounded w-full'>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserLogin;
