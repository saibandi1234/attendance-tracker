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
import AttendanceLogs from './AttendanceLogs';

const Dashboard = () => {
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  const [activeTab, setActiveTab] = useState(
    role === 'employee' ? 'leave' : role === 'manager' ? 'view_leave' : 'summary'
  );

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Dashboard ({role.toUpperCase()})</h2>

      {role === 'employee' && (
        <>
          <button onClick={() => setActiveTab('attendance')}>Clock In/Out</button>
          <button onClick={() => setActiveTab('leave')}>Leave Request</button>
          {activeTab === 'attendance' && <AttendanceForm />}
          {activeTab === 'leave' && <LeaveRequestForm />}
          <AttendanceLogs />
        </>
      )}

      {role === 'manager' && (
        <>
          <button onClick={() => setActiveTab('view_leave')}>View Leave Requests</button>
          {activeTab === 'view_leave' && <ViewAllLeaveRequests />}
        </>
      )}

      {role === 'admin' && (
        <>
          <button onClick={() => setActiveTab('summary')}>Admin Summary</button>
          {activeTab === 'summary' && <AdminSummary />}
        </>
      )}

      <button className="mt-4 text-red-600" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;

