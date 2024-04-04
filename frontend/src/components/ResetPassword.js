
/*import React, { useState } from 'react';
import axios from 'axios';
import './ResetPassword.css';

const PasswordResetPage = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleResetPassword = async () => {
        try {
            // Check if passwords match
            if (newPassword !== confirmPassword) {
                alert("Passwords don't match");
                return;
            }

            // Send request to backend to reset password
            await axios.post('http://localhost:5000/resetPassword', {
                username: 'username', // Or use email
                newPassword: newPassword
            });
            alert('Password reset successfully');
            // Redirect user or perform other actions as needed
        } catch (error) {
            console.error('Error resetting password:', error.message);
            alert('Unable to reset password');
        }
    };

    return (
        <div className="password-reset-container">
          <h2>Reset Password</h2>
          <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <button onClick={handleResetPassword}>Reset Password</button>
        </div>
      );
      
};

export default PasswordResetPage;
*/
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ResetPassword.css';

const ResetPasswordPage = () => {
    const { token } = useParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Optionally, you can validate the token here before allowing the user to reset the password
    }, [token]);

    const handleResetPassword = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:5000/reset-password", { email, token, password });
            setMessage('Password reset successfully');
        } catch (error) {
            setMessage('Failed to reset password. Please try again later.');
            console.error('Password reset failed:', error);
        }
    };

    return (
        <div className="reset-password-container">
            <h2>Reset Password</h2>
            <form onSubmit={handleResetPassword}>
                <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" name="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" onclick={handleResetPassword}>Reset Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResetPasswordPage;
