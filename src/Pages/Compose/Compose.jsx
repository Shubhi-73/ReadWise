import React, { useState } from 'react';
import './Compose.css';
import Navbar  from '../../Component/Navbar/Navbar';
import Footer  from '../../Component/Footer/Footer';
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

    const [ComposeFormData, setComposeFormData] = useState({ title: '', description: '',tag: ''});
    const [contentList, setContentList] = useState([]);

    const handleAddContent = (e) => {
        e.preventDefault();

        if (ComposeFormData.title && ComposeFormData.description && ComposeFormData.tag) {
            // Create a new content item and add it to the list
            const newContent = { title: ComposeFormData.title, description: ComposeFormData.description, tag: ComposeFormData.tag};
            setContentList([...contentList, newContent]);

            // Clear the form data
            setComposeFormData({ title: '', description: '', tag: ''});
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
          <div class="compose">

            <Navbar />
            <div class="compose-page">

            <h2>Compose Page</h2>
            <div class="compose-form">
                <form className="compose-form" onSubmit={handleSubmit}>
                    <input
                        type="text"

                        placeholder="Title"
                        value={ComposeFormData.title}
                        onChange={(e) => setComposeFormData({ ...ComposeFormData, title: e.target.value })}
                    />
                    <textarea

                        placeholder="Description"
                        value={ComposeFormData.description}
                        onChange={(e) => setComposeFormData({ ...ComposeFormData, description: e.target.value })}
                    />
                    <input
                        type="text"

                        placeholder="Tag"
                        value={ComposeFormData.title}
                        onChange={(e) => setComposeFormData({ ...ComposeFormData, tag: e.target.value })}
                    />
                    <button type="submit">Add</button>
                </form>
            </div>
            </div>
            <Footer />
            </div>
    );
}

export default ComposePage;
