import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CertificationApproval.css';

const CertificationApproval = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [selectedUsername, setSelectedUsername] = useState('');
  const [selectedCertification, setSelectedCertification] = useState('');
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch pending users from the backend API
    const fetchPendingUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get-pending-users-certification');
        setPendingUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching pending users:', error);
      }
    };

    fetchPendingUsers();
  }, []);

  const handleUsernameChange = (event) => {
    setSelectedUsername(event.target.value);
    // Filter pending users to get associated certification for the selected username
    const user = pendingUsers.find((user) => user.username === event.target.value);
    if (user) {
      setSelectedCertification(user.course_name); // Update to user.course_name
    }
  };
  
  const handleApprove = async () => {
    try {
        console.log("Hello there!");
      await axios.put(`http://localhost:5000/approve-certification`, {
        username: selectedUsername,
        feedback,
        certification: selectedCertification
      });
      // Display success alert
      alert('Certification approved successfully');
      // Remove the approved user from the dropdown list
      setPendingUsers(pendingUsers.filter(user => user.username !== selectedUsername));
      // Reset feedback
      setFeedback('');
    } catch (error) {
      console.error('Error approving Certification:', error);
      // Display error alert
      alert('Error approving Certification');
    }
  };
  
  const handleDeny = async () => {
    try {
        await axios.put(`http://localhost:5000/deny-certification`, {
        username:selectedUsername,
        feedback,
        certification: selectedCertification
      });
      // Display success alert
      alert('Certification denied successfully');
      // Remove the denied user from the dropdown list
      setPendingUsers(pendingUsers.filter(user => user.username !== selectedUsername));
    } catch (error) {
      console.error('Error denying Certification:', error);
      // Display error alert
      alert('Error denying Certification');
    }
  };

  const handleLogout = () => {
    // Perform logout actions here
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className='certification-container'>
      <h2 className="title">Certification Approver</h2>

      <label htmlFor="username">Select Username:</label>
      <select id="username" value={selectedUsername} onChange={handleUsernameChange}>
        <option value="">Select User</option>
        {pendingUsers.map(user => (
          <option key={user.username} value={user.username}>{user.username}</option>
        ))}
      </select>
      <div>
        <label htmlFor="certification">Certification:</label>
        <input
          id="certification"
          type="text"
          value={selectedCertification}
          disabled
        />
      </div>
      <div className="feedback">
        <label>Feedback:</label>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Leave your feedback here..."
        />
      </div> 

      <div className="actions">
        <button onClick={handleApprove} className="approve-btn">Approve</button>
        <button onClick={handleDeny} className="deny-btn">Deny</button>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

    </div>
  );
};

export default CertificationApproval;

