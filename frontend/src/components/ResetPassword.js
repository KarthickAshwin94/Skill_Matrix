import React, { useState } from 'react';
import axios from 'axios';
import './ResetPassword.css';

const ResetPasswordPage = ({ token }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleResetPassword = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post("http://localhost:5000/reset-password", { email, otp, newPassword });
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
                <input type="text" name="otp" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                <input type="password" name="newPassword" placeholder="Confirm New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                <button type="submit">Reset Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResetPasswordPage;

