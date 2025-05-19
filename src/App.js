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
import LoginPage from './components/LoginPage';

function App() {
  return <LoginPage />;
}

export default App;
