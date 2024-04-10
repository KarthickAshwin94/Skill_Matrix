
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProjectApproval.css';

const ProjectsApproval = () => {
  const [pendingProjects, setPendingProjects] = useState([]);
  const [selectedUsername, setSelectedUsername] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch pending projects from the backend API
    const fetchPendingProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get-pending-projects');
        setPendingProjects(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching pending projects:', error);
      }
    };

    fetchPendingProjects();
  }, []);

  const handleUsernameChange = (event) => {
    setSelectedUsername(event.target.value);
    // Filter pending projects to get associated project details for the selected username
    const project = pendingProjects.find((project) => project.username === event.target.value);
    if (project) {
      setSelectedProject(project.project_name);
    }
  };

  const handleApprove = async () => {
    try {
      await axios.put(`http://localhost:5000/approve-project`, {
        username: selectedUsername,
        feedback,
        project: selectedProject
      });
      // Display success alert
      alert('Project approved successfully');
      // Remove the approved project from the dropdown list
      setPendingProjects(pendingProjects.filter(project => project.username !== selectedUsername));
      // Reset feedback
      setFeedback('');
    } catch (error) {
      console.error('Error approving project:', error);
      // Display error alert
      alert('Error approving project');
    }
  };
  
  const handleDeny = async () => {
    try {
      await axios.put(`http://localhost:5000/deny-project`, {
        username: selectedUsername,
        feedback,
        project: selectedProject
      });
      // Display success alert
      alert('Project denied successfully');
      // Remove the denied project from the dropdown list
      setPendingProjects(pendingProjects.filter(project => project.username !== selectedUsername));
    } catch (error) {
      console.error('Error denying project:', error);
      // Display error alert
      alert('Error denying project');
    }
  };

  const handleLogout = () => {
    // Perform logout actions here
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className='projects-container'>
      <h2 className="title">Project Approver</h2>

      <label htmlFor="username">Select Username:</label>
      <select id="username" value={selectedUsername} onChange={handleUsernameChange}>
        <option value="">Select User</option>
        {pendingProjects.map(project => (
          <option key={project.username} value={project.username}>{project.username}</option>
        ))}
      </select>
      <div>
        <label htmlFor="project">Project:</label>
        <input
          id="project"
          type="text"
          value={selectedProject}
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





export default ProjectsApproval;