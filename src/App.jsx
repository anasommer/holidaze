import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Layout from './components/common/Layout';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>
        {/* <Route path='/venues' element={<List />} />
        <Route path='/venues/:id' element={<Venue />} /> */}
      </Routes>
    </>
  );
}

export default App;
