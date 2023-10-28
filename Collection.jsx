import React, { useState } from 'react';
import './Collection.css'; // Make sure to create a CSS file and import it

function Collection() {
    const [selectedTag, setSelectedTag] = useState('quotes');
    const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);

    const handleTagChange = (tag) => {
        setSelectedTag(tag);
        setIsTagDropdownOpen(false);
    };

    return (
        <div className="collection-page">
            <div className="buttons-container" onClick={() => handleTagChange('quotes')}>
                All Quotes
            </div>
            <div className="tags-dropdown" onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}>
                Tags <i className={`fas fa-caret-${isTagDropdownOpen ? 'up' : 'down'}`}></i>
                {isTagDropdownOpen && (
                    <div className="tags-options">
                        <button onClick={() => handleTagChange('quotes')}>Quotes</button>
                        <button onClick={() => handleTagChange('memories')}>Memories</button>
                        <button onClick={() => handleTagChange('songs')}>Songs</button>
                    </div>
                )}

            </div>
            <div className="content">
                {/* Content based on the selected tag */}
                {selectedTag === 'quotes' && <div className="quotes-content">Quotes content here</div>}
                {selectedTag === 'memories' && <div className="memories-content">Memories content here</div>}
                {selectedTag === 'songs' && <div className="songs-content">Songs content here</div>}
            </div>
        </div>
    );
}

export default Collection;
