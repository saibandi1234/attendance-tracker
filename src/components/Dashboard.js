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
import AdminEmployeeList from './AdminEmployeeList';

const Dashboard = () => {
  const username = localStorage.getItem('username');

  let role = 'employee';
  if (username === '222') role = 'manager';
  if (username === '999') role = 'admin';

  const [activeTab, setActiveTab] = useState(
    role === 'employee' ? 'leave' : role === 'manager' ? 'view_leave' : 'summary'
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Dashboard <span className="badge bg-secondary">{role.toUpperCase()}</span></h2>
        <button className="btn btn-outline-dark" onClick={() => window.location.reload()}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>

      {role === 'employee' && (
        <div className="btn-group mb-4">
          <button className={`btn btn-primary ${activeTab === 'leave' ? 'active' : ''}`} onClick={() => setActiveTab('leave')}>
            <i className="fas fa-paper-plane"></i> Leave Request
          </button>
          <button className={`btn btn-info ${activeTab === 'attendance' ? 'active' : ''}`} onClick={() => setActiveTab('attendance')}>
            <i className="fas fa-clock"></i> Clock In/Out
          </button>
        </div>
      )}

      {role === 'manager' && (
        <div className="btn-group mb-4">
          <button className={`btn btn-warning ${activeTab === 'view_leave' ? 'active' : ''}`} onClick={() => setActiveTab('view_leave')}>
            <i className="fas fa-list"></i> View All Leave Requests
          </button>
        </div>
      )}

      {role === 'admin' && (
        <div className="btn-group mb-4">
          <button className={`btn btn-success ${activeTab === 'summary' ? 'active' : ''}`} onClick={() => setActiveTab('summary')}>
            <i className="fas fa-chart-bar"></i> Admin Summary
          </button>
          <button className={`btn btn-secondary ${activeTab === 'employees' ? 'active' : ''}`} onClick={() => setActiveTab('employees')}>
            <i className="fas fa-users"></i> View Employees
          </button>
        </div>
      )}

      <div className="card p-4 shadow-sm bg-white">
        {role === 'employee' && activeTab === 'leave' && <LeaveRequestForm />}
        {role === 'employee' && activeTab === 'attendance' && <AttendanceForm />}
        {role === 'manager' && activeTab === 'view_leave' && <ViewAllLeaveRequests />}
        {role === 'admin' && activeTab === 'summary' && <AdminSummary />}
        {role === 'admin' && activeTab === 'employees' && <AdminEmployeeList />}
      </div>
    </div>
  );
};

export default Dashboard;
