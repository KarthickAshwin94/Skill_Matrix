import React, { useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';
import LogoutButton from './LogoutButton';
import './CertificationsPage.css';

const AdminDashboard = () => {
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleCreateUser = async () => {
    try {
      await axios.post('http://localhost:5000/createUser', { newUsername, newEmail, newPassword });
      alert('User created successfully');
      // You can add logic to display a success message or update the UI as needed
    } catch (error) {
      console.error('Error creating user:', error.message);
      alert("Unable to register!")
    }
  };
  const makeUserApprover = async (username) => {
    try {
      
      // Send a PUT request to the backend API endpoint with the username
      await axios.post(`http://localhost:5000/make-approver/${username}`);
      console.log("This is nice!")
      console.log("Entered the function");
      alert('User is now an approver');
      // You can add logic to update the UI or display a success message
    } catch (error) {
      console.error('Error making user an approver:', error.message);
      alert('Failed to make user an approver');
    }
  };
  
  

  return (
    <div className="admin-dashboard-container">
      <h2>Create User</h2>
      <input type="text" placeholder="Username" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
      <input type="email" placeholder="Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
      <input type="text" placeholder="Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      <button onClick={handleCreateUser}>Create User</button>

      <h2>Make User Approver</h2>
      <input type="text" placeholder="Username" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
      <button onClick={() => makeUserApprover(newUsername)}>Make User Approver</button>

      <LogoutButton />
    </div>
  );
};

export default AdminDashboard;
