import React, { useState } from 'react';
import axios from 'axios';
import './ResetPassword.css';

const ResetPasswordPage = ({ token }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleResetPassword = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/reset-password", { email, token, newPassword: password });
            setMessage(response.data.message);
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Failed to reset password. Please try again later.');
                console.error('Password reset failed:', error);
            }
        }
    };

    return (
        <div className="reset-password-container">
            <h2>Reset Password</h2>
            <form onSubmit={handleResetPassword}>
                <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" name="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Reset Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResetPasswordPage;
