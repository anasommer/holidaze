import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Layout from './components/common/Layout';
import UserProfile from './components/user/UserProfile/UserProfile';
import useAuthStore from './store/authStore';
import UserRegister from './components/user/UserRegister/UserRegister';
import UserLogin from './components/user/UserLogin/UserLogin';
import VenueItem from './components/venues/VenueItem';
import NotFound from './components/common/NotFound';
import { useEffect } from 'react';
import { UserBookings } from './components/user/UserBookings/UserBookings';
import CreateVenueForm from './components/manager/CreateVenue/CreateVenueForm';

function App() {
  const { isAuthorized, isVenueManager } = useAuthStore();
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <>
      <div className='bg-zinc-50 text-gray-800'>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='/venue/:id' element={<VenueItem />} />
            <Route path='*' element={<NotFound />} />

            {/* Only for authorized users */}
            {isAuthorized ? (
              <>
                <Route path='/profile' element={<UserProfile />} />
                <Route path='/bookings' element={<UserBookings />} />

                {isVenueManager && (
                  <Route path='/create' element={<CreateVenueForm />} />
                )}
              </>
            ) : (
              //  Routes for all users
              <>
                <Route path='/login' element={<UserLogin />} />
                <Route path='/signup' element={<UserRegister />} />
              </>
            )}
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
