import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Attendance from './components/Attendance';
import LeaveRequest from './components/LeaveRequest';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/attendance" element={<Attendance />} />
        <Route path="/dashboard/leave" element={<LeaveRequest />} />
      </Routes>
    </Router>
  );
}
import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div style={{ 
      padding: '30px', 
      fontFamily: 'Arial, sans-serif', 
      backgroundColor: '#f5f5f5', 
      minHeight: '100vh' 
    }}>
      <Dashboard />
    </div>
  );
}

export default App;
