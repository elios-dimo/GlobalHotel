import { Navbar } from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import { Search } from './components/Navbar/';
import { HotelPhotos } from './components/Search/HotelPhotos';

import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/GlobalHotel' element={<Search />} />
        <Route path='/Search' element={<Search />} />
        <Route path='/Search/:hotel_id' element={<HotelPhotos />} />
      </Routes>
    </>
  );
}

export default App;
