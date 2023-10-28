// components/TagPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Tags.css';

function TagPage() {
    const [selectedTag, setSelectedTag] = useState('');
    const tags = ['Songs', 'Memories', 'Quotes'];

    const quotesByTag = {
        Songs: [
            { title: 'Song 1', description: 'Description for Song 1' },
            { title: 'Song 2', description: 'Description for Song 2' },
        ],
        Memories: [
            { title: 'Memory 1', description: 'Description for Memory 1' },
            { title: 'Memory 2', description: 'Description for Memory 2' },
        ],
        Quotes: [
            { title: 'Quote 1', description: 'Description for Quote 1' },
            { title: 'Quote 2', description: 'Description for Quote 2' },
        ],
    };

    const handleTagChange = (e) => {
        setSelectedTag(e.target.value);
    };

    return (
        <div className="tag-page">
            <h2>Tags</h2>
            <select onChange={handleTagChange} value={selectedTag}>
                <option value="">Select a tag</option>
                {tags.map((tag, index) => (
                    <option key={index} value={tag}>
                        {tag}
                    </option>
                ))}
            </select>

            {selectedTag && (
                <div className="quote-list">
                    {quotesByTag[selectedTag].map((quote, index) => (
                        <div key={index}>
                            <h3>{quote.title}</h3>
                            <p>{quote.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default TagPage;
