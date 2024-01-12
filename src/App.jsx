import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        {/* <Route path='/venues' element={<List />} />
        <Route path='/venues/:id' element={<Venue />} /> */}
      </Routes>
    </>
  );
}

export default App;
