import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../../store/authStore';

import useUserStore from '../../../store/userStore';
import UserDropdownMenu from './UserDropDownMenu';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isAuthorized, isVenueManager, logout } = useAuthStore();

  const avatarUrl = useUserStore((state) => state.avatarUrl);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  const handleDropdownItemClick = (path) => {
    setIsDropdownOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    navigate('/');
    setIsDropdownOpen(false);
  };

  return (
    <nav className='bg-gray-800 text-white font-mono pb-2'>
      <div className='mx-auto px-4 flex justify-between items-center h-16 max-w-screen-2xl py-9'>
        <Link
          to='/'
          className='flex items-center py-2 px-2'
          onClick={handleLogoClick}
        >
          <span className='font-bold text-xl text-amber-400'>Holidaze</span>
        </Link>

        {isAuthorized ? (
          <div className='relative py-2'>
            <img
              src={avatarUrl || 'path/to/default/avatar'}
              alt='User avatar'
              className='h-8 w-8 rounded-full cursor-pointer'
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            <svg
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className='w-4 h-4 ml-2 cursor-pointer fill-current text-white'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
            >
              <path d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' />
            </svg>
            {isDropdownOpen && (
              <UserDropdownMenu
                isVenueManager={isVenueManager}
                handleDropdownItemClick={handleDropdownItemClick}
                handleLogout={handleLogout}
              />
            )}
          </div>
        ) : (
          <div className=' md:flex items-center space-x-4'>
            <Link
              to='/login'
              className='py-2 px-3 bg-green-500 hover:bg-amber-400 hover:text-black rounded-lg'
            >
              Login
            </Link>
            <Link
              to='/signup'
              className='py-2 px-3 bg-blue-500 hover:bg-amber-400 hover:text-black rounded-lg'
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
