import React, { useState } from 'react';
import LeaveRequestForm from './LeaveRequestForm';
import AttendanceForm from './AttendanceForm';

const Dashboard = () => {
  const username = localStorage.getItem('username');
  let role = 'employee';
  if (username === '222') role = 'manager';
  if (username === '999') role = 'admin';

  const [activeTab, setActiveTab] = useState('leave');

  return (
    <div>
      <h2>Dashboard ({role})</h2>
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
