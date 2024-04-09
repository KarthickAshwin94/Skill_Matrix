



import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import SkillsPage from './components/SkillsPage';
import CertificationsPage from './components/CertificationsPage';
import ProjectsPage from './components/ProjectsPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import ResetPasswordPage from './components/ResetPassword';


function App() {
  const [username, setUsername] = useState('');

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
    </Routes>
  );
}

export default App;
