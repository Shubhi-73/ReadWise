import React, { useState } from 'react';
import axios from 'axios';

function LoginSignUp() {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/sendData', formData);
            console.log(response.data);
            // Handle the response from the server (e.g., authentication success or failure).
        } catch (error) {
            console.error(error);
            // Handle the error (e.g., show an error message to the user).
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
            />
            <button type="submit">Submit</button>
        </form>
    );
}

export default LoginSignUp;
