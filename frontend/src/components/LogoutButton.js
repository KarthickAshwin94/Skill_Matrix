import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LogoutButton.css'; // Import CSS file

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear(); // Clear local session storage
        navigate('/login'); // Redirect to login page
    };

    return (
        <button className="logout-button" onClick={handleLogout}>Logout</button>
    );
};

export default LogoutButton;
