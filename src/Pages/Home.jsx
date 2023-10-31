import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './Navbar';


const Home = () => {
  //
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/home")
    .then((response) => response.json())
    .then((data) => {
        setContent(data.content);
        setTitle(data.book);
      })
    .catch((error) => console.error('Error:', error));
  }, []);



    return (

        <div>
          <Navbar />

        <p>{title}</p>
        <p>{content}</p>
        </div>
    )
}
export default Home
