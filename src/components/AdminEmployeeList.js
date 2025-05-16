import React, { useEffect, useState } from 'react';

const AdminEmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const res = await fetch('https://attendance-backend-vcna.onrender.com/api/admin/employees');
      const data = await res.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h3>Employee List (Admin)</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>Employee ID</th>
            <th style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>Name</th>
            <th style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>Role</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{emp.id}</td>
              <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{emp.name}</td>
              <td style={{ borderBottom: '1px solid #ddd', padding: '10px', textTransform: 'capitalize' }}>{emp.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminEmployeeList;
