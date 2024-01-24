const UserLogin = () => {
  return (
    <div className='w-full max-w-xs mx-auto my-10'>
      <h1 className='text-center mb-2 font-bold text-2xl'>Login</h1>
      <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
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
          />
          {/* <p className='text-red-500 text-xs italic'>
            Please choose a password.
          </p> */}
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
