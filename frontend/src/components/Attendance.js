import React, { useEffect, useState, useCallback } from 'react';

const Attendance = () => {
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState('clock-in');
  const username = localStorage.getItem('username');

  const fetchLogs = useCallback(async () => {
    try {
      const res = await fetch(`https://attendance-backend-vcna.onrender.com/api/attendance?emp_id=${username}`);
      const data = await res.json();
      setLogs(data);
    } catch (err) {
      console.error('Error fetching logs:', err);
    }
  }, [username]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const entry = {
      employee_id: parseInt(username),
      log_time: new Date().toISOString(),
      status
    };

    try {
      await fetch('https://attendance-backend-vcna.onrender.com/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      });

      alert('Attendance submitted!');
      fetchLogs();
    } catch (err) {
      alert('Failed to submit attendance.');
    }
  };

  return (
    <div>
      <h3>Clock In/Out</h3>
      <form onSubmit={handleSubmit}>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="clock-in">Clock In</option>
          <option value="clock-out">Clock Out</option>
        </select>
        <button type="submit">Submit</button>
      </form>

      <h4>Your Attendance Logs</h4>
      <table border="1" cellPadding="6">
        <thead>
          <tr><th>Log ID</th><th>Time</th><th>Status</th></tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.log_id}>
              <td>{log.log_id}</td>
              <td>{new Date(log.log_time).toLocaleString()}</td>
              <td>{log.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
