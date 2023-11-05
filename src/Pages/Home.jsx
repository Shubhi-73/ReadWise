import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './Home.css';
import Navbar from './Navbar';


const Home = () => {
  //
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/home")
    .then((response) => response.json())
    .then((data) => {
        setContent(data.content);
        setTitle(data.book);
        setUser(data.message);
      })
    .catch((error) => console.error('Error:', error));
  }, []);

  return (
<div className="Home">
  <Navbar />
  <h1>Welcome, {user}!</h1>
  <p>{title}</p>
  <p>{content}</p>
  <p className="special-greeting">Explore Your Quotes</p>
</div>
);
}
export default Home
