import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginRegister from './components/Login';
import Dashboard from './components/Dashboard';
import UserCard from './components/UserCard';
import AllUsers from './components/Allusers';
import EditUser from './components/EditUser';
import Sidebar from './components/Sidebar';
import RegisterUser from './components/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('isAuthenticated', 'false');
  };

  return (
    <Router>
      <Routes>
  {/* Public Routes */}
  <Route path="/" element={<UserCard />} />
  <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginRegister onLogin={handleLogin} />} />

  {/* Protected Routes */}
  <Route
    path="/dashboard"
    element={isAuthenticated ? <ProtectedLayout component={<Dashboard onLogout={handleLogout} />} /> : <Navigate to="/login" />}
  />
  <Route
    path="/allusers"
    element={isAuthenticated ? <ProtectedLayout component={<AllUsers />} /> : <Navigate to="/login" />}
  />
  <Route
    path="/edit"
    element={isAuthenticated ? <ProtectedLayout component={<EditUser />} /> : <Navigate to="/login" />}
  />
  <Route
    path="/register"
    element={isAuthenticated ? <ProtectedLayout component={<RegisterUser />} /> : <Navigate to="/login" />}
  />
</Routes>

    </Router>
  );
}

const ProtectedLayout = ({ component }) => (
  <div className="d-flex">
    <Sidebar />
    <div className="flex-grow-1 p-4">
      {component}
    </div>
  </div>
);

export default App;
