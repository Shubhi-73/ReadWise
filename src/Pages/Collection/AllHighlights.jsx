// components/AllHighlightsPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './AllHighlightsPage.css';

function AllHighlights() {
    // Example list of quotes
    const quotes = [
        { title: 'Quote 1', description: 'Description for Quote 1' },
        { title: 'Quote 2', description: 'Description for Quote 2' },
        // Add more quotes here
    ];

    return (
        <div className="all-highlights-page">
            <h2>All Highlights</h2>
            <ul className="quote-list">
                {quotes.map((quote, index) => (
                    <li key={index}>
                        <Link to={`/quote/${index}`}>
                            <h3>{quote.title}</h3>
                            <p>{quote.description}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AllHighlights;
