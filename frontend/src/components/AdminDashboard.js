import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [summary, setSummary] = useState({});
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch('https://attendance-backend-vcna.onrender.com/api/admin/summary')
      .then(res => res.json())
      .then(data => setSummary(data));

    fetch('https://attendance-backend-vcna.onrender.com/api/admin/employees')
      .then(res => res.json())
      .then(data => setEmployees(data));
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h4>Summary</h4>
      <ul>
        <li>Total Leave Requests: {summary.total}</li>
        <li>Approved: {summary.approved}</li>
        <li>Rejected: {summary.rejected}</li>
        <li>Pending: {summary.pending}</li>
      </ul>

      <h4>Employee List</h4>
      <table border="1">
        <thead>
          <tr>
            <th>Emp ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.emp_id}>
              <td>{emp.emp_id}</td>
              <td>{emp.name}</td>
              <td>{emp.department}</td>
              <td>{emp.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

import React from 'react';
const AdminDashboard = () => (
  <div className="p-8 text-center text-2xl text-purple-800">Welcome to Admin Dashboard</div>
);
export default AdminDashboard;
