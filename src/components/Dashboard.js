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

      {/* Component display based on activeTab */}
      {role === 'employee' && activeTab === 'leave' && <LeaveRequestForm />}
      {role === 'employee' && activeTab === 'attendance' && (
        <>
          <AttendanceForm />
          <AttendanceLogs employeeId={parseInt(username)} />
        </>
      )}
      {role === 'manager' && activeTab === 'view_leave' && <ViewAllLeaveRequests />}
      {role === 'admin' && activeTab === 'summary' && <AdminSummary />}
    </div>
  );
};

export default Dashboard;
