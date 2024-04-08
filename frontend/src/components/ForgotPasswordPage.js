// ForgotPasswordPage.js
/*
import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPasswordPage.css'; // Import the CSS file

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleResetPassword = async (event) => {
        event.preventDefault();
        try {
            // Send a POST request to your backend to trigger sending a reset password email
            await axios.post("http://localhost:5000/forgot-password", { email: email });
            setMessage('Reset password email sent. Please check your email.');
        } catch (error) {
            setMessage('Failed to send reset password email. Please try again later.');
            console.error('Reset password failed:', error);
        }
    };

    return (
        <div className="forgot-password-container"> 
            <h2>Forgot Password</h2>
            <form onSubmit={handleResetPassword}>
                <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button type="submit">Reset Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ForgotPasswordPage;
*/
import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPasswordPage.css';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleResetPassword = async (event) => {
        event.preventDefault();
        try {
      
            await axios.post("http://localhost:5000/forgot-password", { email });
            setMessage('Reset password email sent. Please check your email.');
        } catch (error) {
            setMessage('Failed to send reset password email. Please try again later.');
            console.error('Reset password failed:', error);
        }
    };

    return (
        <div className="forgot-password-container">
            <h2>Forgot Password</h2>
            <form onSubmit={handleResetPassword}>
                <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button type="submit">Reset Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ForgotPasswordPage;
