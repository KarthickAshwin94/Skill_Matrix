import React from 'react';
import { useNavigate } from 'react-router-dom';
import {  useLocation } from 'react-router-dom';
import './UserDashboard.css';
import LogoutButton from './LogoutButton';
import './LogoutButton.css';

const UserDashboard = () => {
  const location=useLocation();
  const {username}= location.state||{};
  const navigate = useNavigate(); // Initialize useNavigate hook

  const navigateToSkills = () => {
    navigate("/user/skills",{ state: { username } });
  };

  const navigateToCertifications = () => {
    navigate("/user/certifications",{ state: { username } });
  };

  const navigateToProjects = () => {
    navigate("/user/projects",{ state: { username } });
  };

  return (
    <div className="user-dashboard">
      <h2>Welcome to Your Dashboard, {username}</h2>
      <div className="dashboard-links">
        <button className="dashboard-item" onClick={navigateToSkills}>
          <i className="fas fa-code"></i>
          <span>Skills</span>
        </button>
        <button className="dashboard-item" onClick={navigateToCertifications}>
          <i className="fas fa-certificate"></i>
          <span>Certifications</span>
        </button>
        <button className="dashboard-item" onClick={navigateToProjects}>
          <i className="fas fa-project-diagram"></i>
          <span>Projects</span>
        </button>
      </div>
      <LogoutButton />
    </div>
  );
};

export default UserDashboard;
