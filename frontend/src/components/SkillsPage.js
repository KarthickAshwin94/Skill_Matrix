
import React, { useState } from 'react';
import axios from 'axios';
import './SkillsPage.css';
import { useLocation } from 'react-router-dom';
const SkillsPage = () => {
  const location = useLocation();
  const { username } = location.state || {}

  const [formData, setFormData] = useState({
    technologyName: '',
    proficiency: 5,
    project: '',
    isApproved: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send skill data to backend API including the username
     
      await axios.post('http://localhost:5000/add-skill', { ...formData, username: username });
      console.log('Skill added successfully');
      setFormData({
        technologyName: '',
        proficiency: 5,
        project: '',
        isApproved: false,
      });
    } catch (error) {
      console.error('Error adding skill:', error);
      alert('Failed to add skill. Please try again.');
    }
  };

  return (
    <div className='login-container'>
      <h2>Add New Skill</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="technologyName">Technologies:</label>
            <select
              id="technologyName"
              name="technologyName"
              value={formData.technologyName}
              onChange={handleChange}
            >
              <option value="">Select Technology</option>
              <option value="Power Bi">Power Bi</option>
              <option value="Python">Python</option>
              <option value="React">React</option>
              <option value="React Native">React Native</option>
            </select>
          </div>
          <div>
            <label htmlFor="proficiency">Proficiency:</label>
            <input
              type="range"
              id="proficiency"
              name="proficiency"
              min="1"
              max="10"
              value={formData.proficiency}
              onChange={handleChange}
            />
            <span>{formData.proficiency}</span>
          </div>
          <div>
            <label htmlFor="project">Name of Real-time Projects:</label>
            <select
              id="project"
              name="project"
              value={formData.project}
              onChange={handleChange}
            >
              <option value="">Select Project</option>
              <option value="Facebook">Facebook</option>
              <option value="Churn Rate Prediction">Churn Rate Prediction</option>
              <option value="Products Sales Report">UPI</option>
              <option value="Customer Retention Rate">Customer Retention Rate</option>
            </select>
          </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};  

export default SkillsPage;














  