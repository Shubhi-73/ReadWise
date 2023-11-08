import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./Compose/Home.css";
import Navbar from '../Component/Navbar/Navbar';
import ParentInfo from "../Component/Info/ParentInfo";
import Footer from "../Component/Footer/Footer";

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
  <h1 id="h1">Welcome, Snigdhaaa!</h1>
  <div className="welcome">
  
  <p id="title"><b>Mindset</b></p>
  <p id="content">In one world, effort is a bad thing. It, like failure, means you’re not smart or talented. If you were, you wouldn’t need effort. In the other world, effort is what makes you smart or talented.</p>
</div>
<ParentInfo />
<Footer />
</div>
);
}
export default Home

