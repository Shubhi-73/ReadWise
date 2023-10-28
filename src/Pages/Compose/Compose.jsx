import React, { useState } from 'react';
import './Compose.css';
import axios from 'axios';

function ComposePage() {
    /* const [title, setTitle] = useState('');
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
       }; */

    const [ComposeFormData, setComposeFormData] = useState({ title: '', description: '' });
    const [contentList, setContentList] = useState([]);

    const handleAddContent = (e) => {
        e.preventDefault();

        if (ComposeFormData.title && ComposeFormData.description) {
            // Create a new content item and add it to the list
            const newContent = { title: ComposeFormData.title, description: ComposeFormData.description };
            setContentList([...contentList, newContent]);

            // Clear the form data
            setComposeFormData({ title: '', description: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // You can use axios to send the data to your server if needed.
            const response = await axios.post('http://localhost:8000/sendComposeData', ComposeFormData);
            console.log(response.data);
            console.log("Form submitted:", ComposeFormData);
        } catch (error) {
            console.error(error);
            // Handle the error (e.g., show an error message to the user).
        }
    };

    return (

        <div className="compose-page">
            <h2>Compose Page</h2>
            <div className="compose-form">
                <form className="compose-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        // name="title"
                        placeholder="Title"
                        value={ComposeFormData.title}
                        onChange={(e) => setComposeFormData({ ...ComposeFormData, title: e.target.value })}
                    />
                    <textarea
                        //  name="description"
                        placeholder="Description"
                        value={ComposeFormData.description}
                        onChange={(e) => setComposeFormData({ ...ComposeFormData, description: e.target.value })}
                    />
                    <button type="submit" onClick={handleAddContent}>Add</button>
                </form>
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

    );
}

export default ComposePage;
