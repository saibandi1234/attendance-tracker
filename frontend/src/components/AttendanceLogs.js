import React, { useEffect, useState } from 'react';

const AttendanceLogs = ({ employeeId }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (!employeeId) return;

    fetch(`https://attendance-backend-vcna.onrender.com/api/attendance?emp_id=${employeeId}`)
      .then(response => response.json())
      .then(data => setLogs(data))
      .catch(error => console.error('Error fetching logs:', error));
  }, [employeeId]);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Attendance Logs</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Log ID</th>
            <th>Employee ID</th>
            <th>Log Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.log_id}>
              <td>{log.log_id}</td>
              <td>{log.employee_id}</td>
              <td>{log.log_time}</td>
              <td>{log.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceLogs;
