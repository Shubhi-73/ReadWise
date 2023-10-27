
import './App.css';
import Axios from "axios";
import Navbar from './Component/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import LoginSignUp from './Pages/LoginSignUp';
import Compose from './Pages/Compose/Compose';
import { useEffect, useState } from 'react';

const App=()=>{
  const [data,setData] =useState();

  const getData=async()=>{
    try {
      const response = await Axios.get("http://localhost:3001/getData");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(()=>{
  getData() 
},[]);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/Home' element={<Home />} />
          <Route path='/' element={<LoginSignUp />} />
          <Route path='/Compose' element={<Compose />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
  }
export default App;
