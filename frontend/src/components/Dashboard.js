import React, { useState } from 'react';
import LeaveRequestForm from './LeaveRequestForm';
import AttendanceForm from './AttendanceForm';
import ViewAllLeaveRequests from './ViewAllLeaveRequests';
import AdminSummary from './AdminSummary';
import AttendanceLogs from './AttendanceLogs';

const Dashboard = () => {
  const username = localStorage.getItem('username');

  let role = 'employee';
  if (username === '222') role = 'manager';
  if (username === '999') role = 'admin';

  const [activeTab, setActiveTab] = useState(
    role === 'employee' ? 'leave' : role === 'manager' ? 'view_leave' : 'summary'
  );

  const handleLogout = () => {
    localStorage.clear();          // Clears login session
    window.location.reload();      // Triggers App.js to re-evaluate and show Login
  };

  return (
    <div>
      <h2>Dashboard ({role.toUpperCase()})</h2>

      {role === 'employee' && (
        <>
          <div>
            <button onClick={() => setActiveTab('attendance')}>Clock In/Out</button>
            <AttendanceLogs />
          </div>
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

      <button onClick={handleLogout}>Logout</button>

      {role === 'employee' && activeTab === 'leave' && <LeaveRequestForm />}
      {role === 'employee' && activeTab === 'attendance' && <AttendanceForm />}
      {role === 'manager' && activeTab === 'view_leave' && <ViewAllLeaveRequests />}
      {role === 'admin' && activeTab === 'summary' && <AdminSummary />}
    </div>
  );
};

export default Dashboard;
