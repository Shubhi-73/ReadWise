import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "../../Component/Navbar/Navbar";
import Footer from "../../Component/Footer/Footer";

import './Collection.css';

function Collection() {

 // const [data, setData] = useState("");
  const [selectedTag, setSelectedTag] = useState("quote");

  // useEffect(() => {
  //   fetch("http://localhost:8000/Collection")
  //   .then((response) => response.json())
  //   .then((data) => setData(data))
  //   .catch((error) => console.error('Error:', error));
  // }, []);

  const data = [
    {
      _id: 1,
      book: "Book 1",
      content: "Content 1",
      tag: "quote",
    },
    {
      _id: 4,
      book: "Book 4",
      content: "Content 4",
      tag: "quote",
    },
    {
      _id: 2,
      book: "Book 2",
      content: "Content 2",
      tag: "song",
    },
    {
      _id: 3,
      book: "Book 3",
      content: "Content 3",
      tag: "entry",
    },
    // Add more objects as needed
  ];


    return (
      <div className='collectionPage'>
          <Navbar />
          <div className='collection'>

        <p>Filter according to tag
        {/*<input type="text" id="tagValue" value="quote"></input>*/}
        <select id="tagValue" onChange={(e) => setSelectedTag(e.target.value)}>
        {/* Add options for tag filtering */}
        <option value="quote">Quote</option>
        <option value="song">Song</option>
        <option value="entry">Entry</option>
      </select>
      </p>

        <ul id="ul">
          {data.length === 0 ? (
            <p>No data available.</p>
          ) : (
            // Use a for loop to iterate through the data
            (() => {
              const items = [];
              for (let i = 0; i < data.length; i++) {
                const note = data[i];
                items.push(
                    /* Render the content of each MongoDB document */
                    selectedTag === note.tag ? (
                      <li id='li' key={note._id}>
                    <div>
                  <p className = "heading">{note.book}</p>
                  <p className = "content">{note.content}</p>
                {/*  <p>Tag: {note.tag}</p> */}
                </div>
                </li>
      ):(null)
                /* Add more properties as needed */

                );
              }
              return items;
            })()
          )}
        </ul>

      </div>
      <Footer />
      </div>
    );
}

export default Collection;
