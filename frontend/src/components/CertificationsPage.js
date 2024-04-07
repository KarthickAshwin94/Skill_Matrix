import React, { useState } from 'react';
import ReactDOM from 'react-dom';
//import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CertificationsPage.css';



export default function CertificationsPage() {
  console.log("random");
  
  const [formData, setFormData] = useState({
    courseName: '',
    institutionName: '',
    fromDate: null,
    toDate: null,
    score: '',
    isApproved: false,
  });
  console.log("random2");
  console.log(formData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFromDateChange = (date) => {
    setFormData({ ...formData, fromDate: date });
  };

  const handleToDateChange = (date) => {
    setFormData({ ...formData, toDate: date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };
  console.log("random3");
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
};