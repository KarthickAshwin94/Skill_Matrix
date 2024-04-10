import React, { useState } from 'react';
import axios from 'axios'; 
import   './ProjectsPage.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ProjectsPage = () => {
  const location = useLocation();
  const { username } = location.state || {};
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
    setFormData((prevState) => ({ ...prevState, fromDate }));
    calculateTotalDays(fromDate, formData.toDate);
  };

  const handleToDateChange = (e) => {
    const toDate = e.target.value;
    setFormData((prevState) => ({ ...prevState, toDate }));
    calculateTotalDays(formData.fromDate, toDate);
  };

  const calculateTotalDays = (fromDate, toDate) => {
    if (fromDate && toDate) {
      const fromDateTime = new Date(fromDate).getTime();
      const toDateTime = new Date(toDate).getTime();
      const differenceInTime = toDateTime - fromDateTime;
      const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
      setFormData((prevState) => ({ ...prevState, totalDays: differenceInDays }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/add-project', { username, ...formData });
      if (response.status === 201) {
        console.log('Project added successfully');
        setFormData({
          projectName: '',
          roleAssigned: '',
          fromDate: '',
          toDate: '',
          totalDays: 0,
        });
      } else {
        console.error('Failed to add project');
      }
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  return (
    <div className='projectsContainer'>
      <h2 className='title'>Add New Project</h2>
      <form onSubmit={handleSubmit} className='form'>
        <div className='formGroup'>
          <label htmlFor="projectName" className='label'>Project Name:</label>
          <select
            id="projectName"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            className='selectInput'
          >
            <option value="">Select Project</option>
            <option value="180 medicals">180 medicals</option>
            <option value="UPI">UPI</option>
            <option value="Net Banking">Net Banking</option>
            <option value="Private Equity">Private Equity</option>
          </select>
        </div>
        <div className='formGroup'>
          <label htmlFor="roleAssigned" className='label'>Role Assigned:</label>
          <select
            id="roleAssigned"
            name="roleAssigned"
            value={formData.roleAssigned}
            onChange={handleChange}
            className='selectInput'
          >
            <option value="">Select Role</option>
            <option value="Developer">Developer</option>
            <option value="Quality Assurance">Quality Assurance</option>
            <option value="Data Analytics">Data Analytics</option>
            <option value="Data Engineer">Data Engineer</option>
          </select>
        </div>
        <div className='formGroup'>
          <label htmlFor="fromDate" className='label'>From Date:</label>
          <input
            type="date"
            id="fromDate"
            name="fromDate"
            value={formData.fromDate}
            onChange={handleFromDateChange}
            className='inputField'
          />
        </div>
        <div className='formGroup'>
          <label htmlFor="toDate" className='label'>To Date:</label>
          <input
            type="date"
            id="toDate"
            name="toDate"
            value={formData.toDate}
            onChange={handleToDateChange}
            className='inputField'
          />
        </div>
        <div className='formGroup'>
          <label htmlFor="totalDays" className='label'>Total Days:</label>
          <input
            type="text"
            id="totalDays"
            name="totalDays"
            value={formData.totalDays}
            readOnly
            className='inputField'
          />
        </div>
        <button type="submit" className='submitButton'>Submit</button>
      </form>
    </div>
  );
};

export default ProjectsPage;
