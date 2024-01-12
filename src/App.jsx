import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import List from './pages/list/List';
import Venue from './pages/venue/Venue';

function App() {
  return (
    <>
      <h1 className='text-3xl font-bold underline bg-rose-400'>Hello world!</h1>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/venues' element={<List />} />
        <Route path='/venues/:id' element={<Venue />} />
      </Routes>
    </>
  );
}

export default App;
