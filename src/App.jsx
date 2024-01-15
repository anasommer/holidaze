import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Layout from './components/common/Layout';
import UserProfile from './components/user/UserProfile/UserProfile';
import useAuthStore from './store/authStore';
import UserRegister from './components/user/UserRegister/UserRegister';

function App() {
  const { isAuthorized } = useAuthStore();

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          {isAuthorized ? (
            <>
              <Route path='/profile' element={<UserProfile />} />{' '}
            </>
          ) : (
            //  Routes for all users
            <Route path='/signup' element={<UserRegister />} />
          )}
        </Route>
      </Routes>
    </>
  );
}

export default App;
