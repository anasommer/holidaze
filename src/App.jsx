import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import List from './pages/list/List';
import Venue from './pages/venue/Venue';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/venues' element={<List />} />
        <Route path='/venues/:id' element={<Venue />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
