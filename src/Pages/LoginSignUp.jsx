import React, { useState } from 'react';
import axios from 'axios';



function LoginSignUp() {
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [signupData, setSignupData] = useState({ username: '', password: '', email: '' });
    const [activeForm, setActiveForm] = useState('login');


    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleSignupChange = (e) => {
        const { name, value } = e.target;
        setSignupData({ ...signupData, [name]: value });
    };

    const handleFormSwitch = () => {
        setActiveForm(activeForm === 'login' ? 'signup' : 'login');
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/sendLoginData', loginData);
            console.log(response.data);


        } catch (error) {
            console.error(error);
            // Handle other errors, e.g., network issues.
        }

        console.log('Login submitted:', loginData);
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/sendSignUpData', signupData);
            console.log(response.data);


        } catch (error) {
            console.error(error);
            // Handle other errors, e.g., network issues.
        }

        console.log('Signup submitted:', signupData);
    };




    return (
        <div className="App">
            <h1>{activeForm === 'login' ? 'Login' : 'Signup'}</h1>
            {activeForm === 'login' ? (
                <form onSubmit={handleLoginSubmit}>
                    <input type="text" name="username" placeholder="Username" value={loginData.username} onChange={handleLoginChange} />
                    <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} />
                    <button type="submit">Login</button>
                </form>
            ) : (
                <form onSubmit={handleSignupSubmit}>
                    <input type="text" name="username" placeholder="Username" value={signupData.username} onChange={handleSignupChange} />
                    <input type="password" name="password" placeholder="Password" value={signupData.password} onChange={handleSignupChange} />
                    <input type="email" name="email" placeholder="Email" value={signupData.email} onChange={handleSignupChange} />
                    <button type="submit">Signup</button>
                </form>
            )}
            <button onClick={handleFormSwitch}>{activeForm === 'login' ? 'Switch to Signup' : 'Switch to Login'}</button>
        </div>
    );
}

export default LoginSignUp;
