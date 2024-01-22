import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Layout from './components/common/Layout';
import UserProfile from './components/user/UserProfile/UserProfile';
import useAuthStore from './store/authStore';
import UserRegister from './components/user/UserRegister/UserRegister';
import UserLogin from './components/user/UserLogin/UserLogin';
import VenueItem from './components/venues/VenueItem';
import NotFound from './components/common/NotFound';

function App() {
  const { isAuthorized } = useAuthStore();

  return (
    <>
      <div className='bg-zinc-50 text-gray-800'>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='/venue/:id' element={<VenueItem />} />
            <Route path='*' element={<NotFound />} />
            {isAuthorized ? (
              <>
                <Route path='/profile' element={<UserProfile />} />{' '}
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
