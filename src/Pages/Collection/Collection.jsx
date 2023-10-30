import React from 'react';
import { Link } from 'react-router-dom';
import './Collection.css';
import Navbar from '../../Component/Navbar/Navbar';

function Collection() {
    return (
        <div>
            <Navbar />
        <div className="home-page">
            <h2>All Highlights</h2>
            <Link to="/all-highlights">See all highlights</Link>

            <h2>Tags</h2>
            <Link to="/tags">See by tags</Link>
        </div>
     </div>
    );
}

export default Collection;
