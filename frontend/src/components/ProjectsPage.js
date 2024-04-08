import React, { useState } from 'react';
import axios from 'axios'; // Import Axios library
import './ProjectsPage.css';
import { Link, useLocation } from 'react-router-dom';

const ProjectsPage = () => {


  const location = useLocation();
  const { username } = location.state || {}
  const [formData, setFormData] = useState({
    projectName: '',
    roleAssigned: '',
    fromDate: '',
    toDate: '',
    totalDays: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFromDateChange = (e) => {
    const fromDate = e.target.value;
    setFormData(prevState => ({ ...prevState, fromDate }));
    calculateTotalDays(fromDate, formData.toDate);
  };
  
  const handleToDateChange = (e) => {
    const toDate = e.target.value;
    setFormData(prevState => ({ ...prevState, toDate }));
    calculateTotalDays(formData.fromDate, toDate);
  };
  const calculateTotalDays = (fromDate, toDate) => {
    if (fromDate && toDate) {
      const fromDateTime = new Date(fromDate).getTime();
      const toDateTime = new Date(toDate).getTime();
      const differenceInTime = toDateTime - fromDateTime;
      const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
      setFormData(prevState => ({ ...prevState, totalDays: differenceInDays }));
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
      const response = await axios.post('http://localhost:5000/add-project',  { username, ...formData });
      if (response.status === 201) {
        console.log('Project added successfully');
        // Clear form fields after successful submission
        setFormData({
          projectName: '',
          roleAssigned: '',
          fromDate: '',
          toDate: '',
          totalDays: 0,
        });
      } else {
        console.error('Failed to add project');
        // Handle error appropriately
      }
    } catch (error) {
      console.error('Error adding project:', error);
      // Handle error appropriately
    }
  };

  return (
    <div className='projects-container'>
      <h2>Add New Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="projectName">Project Name:</label>
          <input
            type="text"
            id="projectName"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="roleAssigned">Role Assigned:</label>
          <select
            id="roleAssigned"
            name="roleAssigned"
            value={formData.roleAssigned}
            onChange={handleChange}
          >
            <option value="">Select Role</option>
            <option value="Developer">Developer</option>
            <option value="Quality Assurance">Quality Assurance</option>
            <option value="Data Analytics">Data Analytics</option>
            <option value="Data Engineer">Data Engineer</option>
          </select>
        </div>
        <div>
          <label htmlFor="fromDate">From Date:</label>
          <input
            type="date"
            id="fromDate"
            name="fromDate"
            value={formData.fromDate}
            onChange={handleFromDateChange}
          />
        </div>
        <div>
          <label htmlFor="toDate">To Date:</label>
          <input
            type="date"
            id="toDate"
            name="toDate"
            value={formData.toDate}
            onChange={handleToDateChange}
          />
        </div>
        <div>
          <label htmlFor="totalDays">Total Days:</label>
          <input
            type="text"
            id="totalDays"
            name="totalDays"
            value={formData.totalDays}
            readOnly
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProjectsPage;
