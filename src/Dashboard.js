import React from 'react';
import { useNavigate } from 'react-router-dom';
import Attendance from './Attendance';
import LeaveRequestForm from './LeaveRequestForm';
import LeaveStatusTable from './LeaveStatusTable';
import ManagerPanel from './ManagerPanel';

function Dashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      <Attendance />
      <LeaveRequestForm />
      <LeaveStatusTable />
      {role === 'manager' && <ManagerPanel />}
    </div>
  );
}

export default Dashboard;
