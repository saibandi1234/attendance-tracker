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

      {/* Conditional rendering by role and tab */}
      {role === 'employee' && activeTab === 'leave' && <LeaveRequestForm />}
      {role === 'employee' && activeTab === 'attendance' && <AttendanceForm />}
      {role === 'manager' && activeTab === 'view_leave' && (
        <>
          <ViewAllLeaveRequests />
          <AttendanceLogs employeeId={222} /> {/* ✅ Show logs here */}
        </>
      )}
      {role === 'admin' && activeTab === 'summary' && <AdminSummary />}
    </div>
  );
};

export default Dashboard;
