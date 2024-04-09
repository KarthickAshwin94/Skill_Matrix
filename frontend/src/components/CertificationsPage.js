

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios'; // Import Axios library
import './CertificationsPage.css';
import { useNavigate } from 'react-router-dom';

export default function CertificationsPage() {
  const location = useLocation();
  const { username } = location.state || {}
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [formData, setFormData] = useState({
    courseName: '',
    institutionName: '',
    fromDate: null,
    toDate: null,
    score: '',
    isApproved: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(username);
      const response = await axios.post('http://localhost:5000/add-certification', { username, ...formData });
      if (response.status === 201) {
        console.log('Certification added successfully');
        navigate('/user'); // Redirect to dashboard after successful submission
      } else {
        console.error('Failed to add certification');
        // Handle error appropriately
      }
    } catch (error) {
      console.error('Error adding certification:', error);
      // Handle error appropriately
    }
  };

  return (
    <div className='certifications-container'>
      <h2>Add New Certification</h2>
      <form onSubmit={handleSubmit}>

      <div>
          <label htmlFor="courseName">Course Name:</label>
          <input
            type="text"
            id="courseName"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label htmlFor="institutionName">Institution Name:</label>
          <input
            type="text"
            id="institutionName"
            name="institutionName"
            value={formData.institutionName}
            onChange={handleChange}
          />
        </div>
        <div>
  <label htmlFor="fromDate">From Date:</label>
  <input
    type="date"
    id="fromDate"
    name="fromDate"
    value={formData.fromDate || ''}
    onChange={handleChange}
  />
</div>
<div>
  <label htmlFor="toDate">To Date:</label>
  <input
    type="date"
    id="toDate"
    name="toDate"
    value={formData.toDate || ''}
    onChange={handleChange}
  />
</div>

        <div>
          <label htmlFor="score">Score:</label>
          <input
            type="text"
            id="score"
            name="score"
            value={formData.score}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="isApproved">Is Approved:</label>
          <input
            type="checkbox"
            id="isApproved"
            name="isApproved"
            checked={formData.isApproved}
            onChange={(e) => setFormData({ ...formData, isApproved: e.target.checked })}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
