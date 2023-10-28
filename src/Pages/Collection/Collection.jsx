import React from 'react';
import { Link } from 'react-router-dom';
import './Collection.css';

function Collection() {
    return (
        <div className="home-page">
            <h2>All Highlights</h2>
            <Link to="/all-highlights">See all highlights</Link>

            <h2>Tags</h2>
            <Link to="/tags">See by tags</Link>
        </div>
    );
}

export default Collection;
