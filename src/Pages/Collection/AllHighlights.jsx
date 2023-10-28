// components/AllHighlightsPage.js
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import './Collection.css';

function Collection() {
    // Example list of quotes
    const quotes = [
        { title: 'Quote 1', description: 'Description for Quote 1' },
        { title: 'Quote 2', description: 'Description for Quote 2' },
        // Add more quotes here
    ];

    const [data, setData] = useState("");



    useEffect(() => {
      fetch("http://localhost:8000/Collection")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error:', error));
    }, []);

    return (
        <div className="all-highlights-page">

          <h1>MongoDB Documents</h1>
          <ul>
            {data.length === 0 ? (
              <p>No data available.</p>
            ) : (
              // Use a for loop to iterate through the data
              (() => {
                const items = [];
                for (let i = 0; i < data.length; i++) {
                  const document = data[i];
                  items.push(
                    <li key={document._id}>
                      {/* Render the content of each MongoDB document */}
                      <p>Book: {document.book}</p>
                      <p>Content: {document.content}</p>
                      {/* Add more properties as needed */}
                    </li>
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
