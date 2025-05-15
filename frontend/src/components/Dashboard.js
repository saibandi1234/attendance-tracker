import React, { useEffect, useState } from 'react';

const Dashboard = ({ onLogout }) => {
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');

  const [tab, setTab] = useState('leave');
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [attendanceLogs, setAttendanceLogs] = useState([]);
  const [status, setStatus] = useState('clock-in');

  const fetchLeaveRequests = async () => {
    try {
      const res = await fetch('https://attendance-backend-vcna.onrender.com/api/leave_requests');
      const data = await res.json();
      setLeaveRequests(data.filter(r => r.employee_id === parseInt(username)));
    } catch (err) {
      console.error('Error fetching leave requests:', err);
    }
  };

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
    fetchLeaveRequests();
    fetchAttendanceLogs();
  }, []);

  const handleLeaveSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const leave_id = leaveRequests.length > 0
      ? Math.max(...leaveRequests.map(r => r.leave_id)) + 1
      : 1;

    const newRequest = {
      leave_id,
      employee_id: parseInt(username),
      start_date: form.start_date.value,
      end_date: form.end_date.value,
      reason: form.reason.value,
      status: 'pending',
    };

    try {
      await fetch('https://attendance-backend-vcna.onrender.com/api/leave_requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRequest),
      });
      alert('Leave request submitted!');
      fetchLeaveRequests();
      form.reset();
    } catch (err) {
      alert('Error submitting leave request');
    }
  };

  const handleClockSubmit = async (e) => {
    e.preventDefault();

    const log = {
      employee_id: parseInt(username),
      log_time: new Date().toISOString(),
      status
    };

    try {
      await fetch('https://attendance-backend-vcna.onrender.com/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(log),
      });
      alert('Attendance logged!');
      fetchAttendanceLogs();
    } catch (err) {
      alert('Failed to log attendance');
    }
  };

  return (
    <div>
      <h3>Welcome, {username} ({role})</h3>
      <button onClick={onLogout}>Logout</button>

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => setTab('leave')}>Leave Request</button>
        <button onClick={() => setTab('clock')}>Clock In/Out</button>
      </div>

      {tab === 'leave' && (
        <>
          <h4>Submit Leave Request</h4>
          <form onSubmit={handleLeaveSubmit}>
            <label>Start Date:</label><br />
            <input name="start_date" type="date" required /><br /><br />
            <label>End Date:</label><br />
            <input name="end_date" type="date" required /><br /><br />
            <label>Reason:</label><br />
            <input name="reason" type="text" required /><br /><br />
            <button type="submit">Submit</button>
          </form>

          <h4>Your Leave Requests</h4>
          <table border="1" cellPadding="6">
            <thead>
              <tr><th>ID</th><th>Start</th><th>End</th><th>Reason</th><th>Status</th></tr>
            </thead>
            <tbody>
              {leaveRequests.map(r => (
                <tr key={r.leave_id}>
                  <td>{r.leave_id}</td>
                  <td>{r.start_date}</td>
                  <td>{r.end_date}</td>
                  <td>{r.reason}</td>
                  <td>{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {tab === 'clock' && (
        <>
          <h4>Clock In/Out</h4>
          <form onSubmit={handleClockSubmit}>
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
              {attendanceLogs.map(log => (
                <tr key={log.log_id}>
                  <td>{log.log_id}</td>
                  <td>{new Date(log.log_time).toLocaleString()}</td>
                  <td>{log.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Dashboard;
