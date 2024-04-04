import React from 'react';
import { Link } from 'react-router-dom';
import './UserDashboard.css';
import LogoutButton from './LogoutButton';

const UserDashboard = () => {
  return (
    <div className="user-dashboard">
      <h2>Welcome to Your Dashboard</h2>
      <div className="dashboard-links">
        <Link to="/user/skills" className="dashboard-link">
          <div className="dashboard-item">
            <i className="fas fa-code"></i>
            <span>Skills</span>
          </div>
        </Link>
        <Link to="/user/certifications" className="dashboard-link">
          <div className="dashboard-item">
            <i className="fas fa-certificate"></i>
            <span>Certifications</span>
          </div>
        </Link>
        <Link to="/user/projects" className="dashboard-link">
          <div className="dashboard-item">
            <i className="fas fa-project-diagram"></i>
            <span>Projects</span>
          </div>
        </Link>
      </div>
      <LogoutButton /> {/* Add LogoutButton component here */}
    </div>
   
  );
};

export default UserDashboard;
