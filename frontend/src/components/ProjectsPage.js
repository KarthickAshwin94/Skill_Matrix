import React, { useState } from 'react';
import './ProjectsPage.css';

const ProjectsPage = () => {
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
    setFormData({ ...formData, fromDate });
    calculateTotalDays(fromDate, formData.toDate);
  };

  const handleToDateChange = (e) => {
    const toDate = e.target.value;
    setFormData({ ...formData, toDate });
    calculateTotalDays(formData.fromDate, toDate);
  };

  const calculateTotalDays = (fromDate, toDate) => {
    if (fromDate && toDate) {
      const fromDateTime = new Date(fromDate).getTime();
      const toDateTime = new Date(toDate).getTime();
      const differenceInTime = toDateTime - fromDateTime;
      const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
      setFormData({ ...formData, totalDays: differenceInDays });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
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
