import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');

  return (
    <div>
      <h3>Welcome, {username} ({role})</h3>
      <a href="/">Logout</a>
      <br /><br />

      {role === 'employee' && (
        <>
          <Link to="/dashboard/attendance">
            <button>Clock In/Out</button>
          </Link>{' '}
          <Link to="/dashboard/leave">
            <button>Leave Request</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Dashboard;

