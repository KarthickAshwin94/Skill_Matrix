import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPasswordPage.css';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleResetPassword = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/send-otp", { email });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Failed to send reset password OTP. Please try again later.');
            console.error('Reset password OTP failed:', error);
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
