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
