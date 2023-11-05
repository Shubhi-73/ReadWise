import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './Navbar';

import './Collection.css';

function Collection() {

  const [data, setData] = useState("");
  const [selectedTag, setSelectedTag] = useState("quote");

  useEffect(() => {
    fetch("http://localhost:8000/Collection")
    .then((response) => response.json())
    .then((data) => setData(data))
    .catch((error) => console.error('Error:', error));
  }, []);


    return (
      <div>
          <Navbar />

        <h2>Filter according to tag</h2>
        {/*<input type="text" id="tagValue" value="quote"></input>*/}
        <select id="tagValue" onChange={(e) => setSelectedTag(e.target.value)}>
        {/* Add options for tag filtering */}
        <option value="quote">Quote</option>
        <option value="song">Song</option>
        <option value="entry">Entry</option>
      </select>

        <ul>
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
                      <li key={note._id}>
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
    );
}

export default Collection;
