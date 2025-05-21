import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';

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
import Dashboard from './components/Dashboard';

function App() {
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');
  const path = window.location.pathname;

  if (!username || !role) {
    return <LoginPage />;
  }

  return <Dashboard />;
}

export default App;
