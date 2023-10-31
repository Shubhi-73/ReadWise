import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './Pages/Navbar';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Collection from './Pages/Collection';
import Compose from './Pages/Compose';

function App() {
  const [message, setMessage] = useState("");


  useEffect(() => {
    fetch("http://localhost:8000")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
  }, []);

  return (
    <div>
    <div className="App">
    <BrowserRouter>
    
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/Compose' element={<Compose />} />
        <Route path='/Collection' element={<Collection />} />
        <Route path='/' element={<Login />} />
      </Routes>
    </BrowserRouter>
    </div>


      <h1>Hi! {message}</h1>
    </div>
  );
}

export default App
