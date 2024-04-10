import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './CertificationsPage.css';
import { useNavigate } from 'react-router-dom';

export default function CertificationsPage() {
  const location = useLocation();
  const { username } = location.state || {}
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    courseName: '',
    institutionName: '',
    fromDate: '',
    toDate: '',
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
   
      const response = await axios.post('http://localhost:5000/add-certification', { username, ...formData });
      if (response.status === 201) {
        console.log('Certification added successfully');
        navigate('/user');
      } else {
        console.error('Failed to add certification');
      }
    } catch (error) {
      console.error('Error adding certification:', error);
    }
  };

  return (
    <div className='certifications-container'>
      <h2>Add New Certification</h2>
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="courseName">Course Name:</label>
          <select
            id="courseName"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Select Course</option>
            <option value="Programming in Java">Programming in Java</option>
            <option value="Data Analytics using Python">Data Analytics using Python</option>
            <option value="C#">C#</option>
            <option value="Web Development">Web Development</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="institutionName">Institution Name:</label>
          <select
            id="institutionName"
            name="institutionName"
            value={formData.institutionName}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Select Institution</option>
            <option value="NPTEL">NPTEL</option>
            <option value="Coursera">Coursera</option>
            <option value="Google">Google</option>
            <option value="Prepinsta">Prepinsta</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="fromDate">From Date:</label>
          <input
            type="date"
            id="fromDate"
            name="fromDate"
            value={formData.fromDate}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="toDate">To Date:</label>
          <input
            type="date"
            id="toDate"
            name="toDate"
            value={formData.toDate}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="score">Score:</label>
          <input
            type="text"
            id="score"
            name="score"
            value={formData.score}
            onChange={handleChange}
            className="form-control"
          />
        </div>

  
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
