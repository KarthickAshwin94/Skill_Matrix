import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import SkillsPage from './components/SkillsPage';
import CertificationsPage from './components/CertificationsPage';
import ProjectsPage from './components/ProjectsPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import ResetPasswordPage from './components/ResetPassword';
import SkillApproval from './components/SkillApproval';
import CertificationApproval from './components/CertificationApproval';
import ProjectsApproval from './components/ProjectApproval';
function App() {
  const [username, setUsername] = useState('');
  const [usernames, setUsernames] = useState([]);



  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage setUsername={setUsername} />}
      />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route
        path="/user"
        element={<UserDashboard username={username} />}
      />
      <Route
        path="/user/skills"
        element={<SkillsPage username={username} />}
      />
      <Route
        path="/user/certifications"
        element={<CertificationsPage />}
      />
      <Route
        path="/user/projects"
        element={<ProjectsPage />}
      />
      <Route
        path="/forgot-password"
        element={<ForgotPasswordPage />}
      />
      <Route
        path="/reset-password"
        element={<ResetPasswordPage />}
      />
      <Route
        path="/skill-approval"
        element={<SkillApproval />}
      />
      <Route
        path="/certification-approval"
        element={< CertificationApproval/>}
      />
      <Route
        path="/project-approval"
        element={<ProjectsApproval/>}
      />
    </Routes>
  );
}

export default App;

