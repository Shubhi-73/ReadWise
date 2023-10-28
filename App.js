
import './App.css';
import Navbar from './Component/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import LoginSignUp from './Pages/LoginSignUp';
import Compose from './Pages/Compose/Compose';
import { useEffect, useState } from 'react';
import CollectionPage from './Pages/Collection/Collection';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginSignUp />} />
          <Route path='/Compose' element={<ComposePage />} />
          <Route path='/Collection' element={<CollectionPage />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
