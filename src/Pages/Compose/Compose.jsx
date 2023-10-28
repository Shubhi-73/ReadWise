import React, { useState } from 'react';
import './Compose.css';
import axios from 'axios';

function ComposePage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [contentList, setContentList] = useState([]);

    const handleAddContent = () => {
        if (title && description) {
            // Create a new content item and add it to the list
            const newContent = { title, description };
            setContentList([...contentList, newContent]);

            // Clear the input fields
            setTitle('');
            setDescription('');
        }
    };

    const [ComposeFormData, setComposeFormData] = useState({ title: '', description: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/sendData', ComposeFormData);
            console.log(response.data);
            // Handle the response from the server (e.g., authentication success or failure).
        } catch (error) {
            console.error(error);
            // Handle the error (e.g., show an error message to the user).
        }
    };

    const handleChange = (e) => {
        setComposeFormData({ ...ComposeFormData, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="compose-page">
                <h2>Compose Page</h2>
                <div className="compose-form">
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={title}
                        onChange={handleChange}
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={description}
                        onChange={handleChange}
                    />
                    <button type="submit" onClick={handleAddContent}>Add</button>
                </div>
                {/* <div className="content-list">
                {contentList.map((content, index) => (
                    <div key={index} className="content-item">
                        <h3>{content.title}</h3>
                        <p>{content.description}</p>
                    </div>
                ))}
            </div> */}
            </div>
        </form>
    );
}

export default ComposePage;
