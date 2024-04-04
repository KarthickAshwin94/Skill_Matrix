import React, { useState } from 'react';
import './SkillsPage.css';

const SkillsPage = () => {
  const [formData, setFormData] = useState({
    technologyName: '',
    proficiency: 5, // Default proficiency value
    project: '',
    isApproved: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
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
            <option value="PHP">PHP</option>
            <option value="Power Bi">Power Bi</option>
            <option value="Python">Python</option>
            <option value="React">React</option>
            <option value="React Native">React Native</option>
            <option value="Snowflake">Snowflake</option>
          </select>
        </div>
        <div>
          <label htmlFor="proficiency">Proficiency:</label>
          {/* Slider for proficiency */}
          <input
            type="range"
            id="proficiency"
            name="proficiency"
            min="1"
            max="10"
            value={formData.proficiency}
            onChange={handleChange}
          />
          {/* Display current proficiency value */}
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
            <option value="Products Sales Report">Products Sales Report</option>
          </select>
        </div>
        <div>
          <label htmlFor="isApproved">Is Approved:</label>
          <input
            type="checkbox"
            id="isApproved"
            name="isApproved"
            checked={formData.isApproved}
            onChange={(e) =>
              setFormData({ ...formData, isApproved: e.target.checked })
            }
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SkillsPage;
