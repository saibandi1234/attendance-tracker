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
import ViewAllLeaveRequests from './ViewAllLeaveRequests';
import AdminSummary from './AdminSummary';

const Dashboard = () => {
  const username = localStorage.getItem('username');

  let role = 'employee';
  if (username === '222') role = 'manager';
  if (username === '999') role = 'admin';

  const [activeTab, setActiveTab] = useState(
    role === 'employee' ? 'leave' : role === 'manager' ? 'view_leave' : 'summary'
  );

  return (
    <div>
      <h2>Dashboard ({role.toUpperCase()})</h2>

      {role === 'employee' && (
        <>
          <button onClick={() => setActiveTab('leave')}>Leave Request</button>
          <button onClick={() => setActiveTab('attendance')}>Clock In/Out</button>
        </>
      )}

      {role === 'manager' && (
        <>
          <button onClick={() => setActiveTab('view_leave')}>View All Leave Requests</button>
        </>
      )}

      {role === 'admin' && (
        <>
          <button onClick={() => setActiveTab('summary')}>Admin Summary</button>
        </>
      )}

      <button onClick={() => window.location.reload()}>Logout</button>

      {role === 'employee' && activeTab === 'leave' && <LeaveRequestForm />}
      {role === 'employee' && activeTab === 'attendance' && <AttendanceForm />}
      {role === 'manager' && activeTab === 'view_leave' && <ViewAllLeaveRequests />}
      {role === 'admin' && activeTab === 'summary' && <AdminSummary />}
    </div>
  );
};

export default Dashboard;
