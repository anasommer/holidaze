import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../../../store/authStore';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthorized, isVenueManager } = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      <nav className='bg-gray-800 text-white font-mono'>
        <div className='mx-auto px-4 flex justify-between items-center h-16 max-w-screen-2xl py-9'>
          {/* Logo */}
          <Link to='/' className='flex items-center py-2 px-2'>
            <span className='font-bold text-xl text-amber-400'>Holidaze</span>
          </Link>

          {/* Search Bar - Hidden on Mobile */}
          <div className='hidden md:flex items-center space-x-1 flex-1 max-w-md'>
            <input
              type='text'
              className='p-2 w-full rounded-lg text-black'
              placeholder='Search Venues'
            />
          </div>

          {/* Right Section: User Avatar or Login/Signup */}
          {isAuthorized ? (
            // User Avatar and Dropdown
            <div className='relative py-2'>
              <img
                src='/src/assets/images/user-avatar.jpeg'
                alt='User avatar'
                className='h-8 w-8 rounded-full cursor-pointer mt-3'
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />{' '}
              <svg
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className='w-4 h-4 ml-2'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M19 9l-7 7-7-7'
                />
              </svg>
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className='absolute right-0 mt-2 py-2 w-48 bg-gray-800 rounded-md shadow-xl z-50 '>
                  <div className='border-t border-amber-200 my-1'></div>
                  <div className='px-4 py-2 text-xs  bg-gray-800 text-amber-400 '>
                    User Options:
                  </div>
                  <Link
                    to='/profile'
                    className='block px-4 py-2 text-sm bg-gray-800 text-neutral-100 hover:bg-amber-300 hover:text-black'
                  >
                    Profile
                  </Link>
                  <Link
                    to='/bookings'
                    className='block px-4 py-2 text-sm bg-gray-800 text-neutral-100 hover:bg-amber-300 hover:text-black'
                  >
                    Your Bookings
                  </Link>

                  {isVenueManager && (
                    <>
                      <div className='border-t border-amber-400 my-1'></div>
                      <div className='px-4 py-2 text-xs bg-gray-800 text-amber-400'>
                        Manager Options:
                      </div>
                      <Link
                        to='/manage-venues'
                        className='block px-4 py-2 text-sm bg-gray-800 text-neutral-100 hover:bg-amber-300 hover:text-black'
                      >
                        Create Venue
                      </Link>
                      <Link
                        to='/manage-venues'
                        className='block px-4 py-2 text-sm bg-gray-800 text-neutral-100 hover:bg-amber-300 hover:text-black'
                      >
                        Manage Venues
                      </Link>
                      {/* Additional venue manager links */}
                    </>
                  )}

                  <div className='border-t border-amber-400 my-1 '></div>
                  <Link
                    to='/logout'
                    className='block px-4 py-2 text-sm hover:bg-red-400 hover:text-black text-neutral-100'
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            // Login/Signup Buttons
            <div className='hidden md:flex items-center space-x-4'>
              <Link
                to='/login'
                className='py-2 px-3 hover:bg-amber-400 rounded-lg hover:text-black bg-green-500'
              >
                Login
              </Link>
              <Link
                to='/signup'
                className='py-2 px-3 bg-blue-500 hover:bg-amber-400 hover:text-black text-white rounded-lg'
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Hamburger Icon - Only if not authorized */}
          {!isAuthorized && (
            <div className='md:hidden flex items-center'>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16m-7 6h7'
                  ></path>
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu - Only for Unauthorized Users */}
        {!isAuthorized && isMobileMenuOpen && (
          <div className='md:hidden'>
            <Link
              to='/login'
              className='block py-2 px-4 text-sm hover:bg-green-500 text-center hover:text-black'
            >
              Login
            </Link>
            <Link
              to='/signup'
              className='block py-2 px-4 text-sm hover:bg-amber-400 text-center hover:text-black'
            >
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    </>
  );
};
export default Navbar;
