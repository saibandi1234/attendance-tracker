import React, { useEffect, useState } from 'react';

const Attendance = () => {
  const [attendanceLogs, setAttendanceLogs] = useState([]);
  const [attendanceStatus, setAttendanceStatus] = useState('clock-in');
  const username = localStorage.getItem('username');

  const fetchAttendanceLogs = async () => {
    try {
      const res = await fetch(`https://attendance-backend-vcna.onrender.com/api/attendance?emp_id=${username}`);
      const data = await res.json();
      setAttendanceLogs(data);
    } catch (err) {
      console.error('Error fetching attendance logs:', err);
    }
  };

  useEffect(() => {
    fetchAttendanceLogs();
  }, []);

  const handleClockSubmit = async (e) => {
    e.preventDefault();

    const entry = {
      employee_id: parseInt(username),
      log_time: new Date().toISOString(),
      status: attendanceStatus,
    };

    try {
      const res = await fetch('https://attendance-backend-vcna.onrender.com/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      });

      if (!res.ok) throw new Error('Failed to log attendance');
      alert('Attendance logged!');
      fetchAttendanceLogs();
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to log attendance');
    }
  };

  return (
    <div>
      <h3>Clock In/Out</h3>

      <form onSubmit={handleClockSubmit}>
        <label>Status:</label><br />
        <select value={attendanceStatus} onChange={(e) => setAttendanceStatus(e.target.value)}>
          <option value="clock-in">Clock In</option>
          <option value="clock-out">Clock Out</option>
        </select><br /><br />
        <button type="submit">Submit Attendance</button>
      </form>

      <h4>Your Attendance Logs</h4>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Log ID</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceLogs.length === 0 ? (
            <tr><td colSpan="3">No records found.</td></tr>
          ) : (
            attendanceLogs.map(log => (
              <tr key={log.log_id}>
                <td>{log.log_id}</td>
                <td>{new Date(log.log_time).toLocaleString()}</td>
                <td>{log.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
