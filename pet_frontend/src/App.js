import React, { useState, useEffect } from 'react'; 
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PetDetailsForm from './Components/PetDetailsForm';
import DoctorDetails from './Components/DoctorDetails';
import UserForm from './Components/UserForm';
import Sidebar from './Components/Sidebar';
import Login from './Components/Login';
import Signup from './Components/Signup';
import './App.css';
import PetProfile from './Components/PetProfile';
import EmployeeDetails from './Components/EmployeeDetails';
import DocDecision from './Components/DocDecision';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // State to track admin access

  // Check if the user is logged in and is an admin
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role'); // Assuming you're storing role in localStorage
    if (token) {
      setIsLoggedIn(true);
      setIsAdmin(role === 'admin'); // Set admin state based on role
    }
  }, []);

  // Function to handle successful login
  const handleLoginSuccess = (role) => {
    setIsLoggedIn(true);
    setIsAdmin(role === 'admin');
    localStorage.setItem('token', 'your-login-token'); // Store token
    localStorage.setItem('role', role); // Store user role
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  return (
    <Router>
      <div className="app-container">
        {isLoggedIn && <Sidebar onLogout={handleLogout} />}
        <div className="content">
          <Routes>
            {/* Redirect to login if not logged in */}
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected routes */}
            {isLoggedIn ? (
              <>
                <Route path="/PetDetailsForm" element={<PetDetailsForm />} />
                <Route path="/PetProfile" element={<PetProfile />} />
                <Route path="/DocDecision" element={<DocDecision />} />
                <Route path="/DoctorDetails" element={<DoctorDetails />} />
                <Route path="/EmployeeDetails" element={<EmployeeDetails />} />
                {/* Redirect to pet profile or another default route */}
                <Route path="*" element={<Navigate to={isAdmin ? "/DoctorDetails" : "/PetProfile"} />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
