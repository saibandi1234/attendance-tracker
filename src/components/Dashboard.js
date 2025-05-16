import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');

  return (
    <div>
      <h3>Dashboard Loaded</h3>
      <p>Username: {username}</p>
      <p>Role: {role}</p>
      <a href="/">Logout</a>
      <br /><br />

      {role === 'employee' ? (
        <>
          <Link to="/dashboard/attendance">
            <button>Clock In/Out</button>
          </Link>{' '}
          <Link to="/dashboard/leave">
            <button>Leave Request</button>
          </Link>
        </>
      ) : (
        <p>No employee view. Your role is: {role}</p>
      )}
import React, { useState } from 'react';
import LeaveRequestForm from './LeaveRequestForm';
import AttendanceForm from './AttendanceForm';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('leave');

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={() => setActiveTab('leave')}>Leave Request</button>
      <button onClick={() => setActiveTab('attendance')}>Clock In/Out</button>
      <button onClick={() => window.location.reload()}>Logout</button>

      {activeTab === 'leave' ? <LeaveRequestForm /> : <AttendanceForm />}
    </div>
  );
};

export default Dashboard;
