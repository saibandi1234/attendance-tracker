import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [attendanceLogs, setAttendanceLogs] = useState([]);
  const [attendanceStatus, setAttendanceStatus] = useState('clock-in');

  const fetchLeaveRequests = async () => {
    try {
      const response = await fetch('https://attendance-backend-vcna.onrender.com/api/leave_requests');
      const data = await response.json();
      setLeaveRequests(data);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmitLeave = async (e) => {
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
      const response = await fetch('https://attendance-backend-vcna.onrender.com/api/leave_requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRequest),
      });

      if (!response.ok) throw new Error('Failed to submit request');
      alert('Leave request submitted!');
      fetchLeaveRequests();
      form.reset();
    } catch (error) {
      console.error('Submission error:', error);
      alert('Error submitting leave request');
    }
  };

  const handleClockSubmit = async (e) => {
    e.preventDefault();

    const attendanceEntry = {
      employee_id: parseInt(username),
      log_time: new Date().toISOString(),
      status: attendanceStatus,
    };

    try {
      const res = await fetch('https://attendance-backend-vcna.onrender.com/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attendanceEntry),
      });

      if (!res.ok) throw new Error('Failed to log attendance');
      alert('Attendance logged!');
      fetchAttendanceLogs();
    } catch (err) {
      console.error('Attendance log error:', err);
      alert('Failed to log attendance');
    }
  };

  const handleStatusUpdate = async (leave_id, status) => {
    try {
      const res = await fetch(`https://attendance-backend-vcna.onrender.com/api/leave_requests/${leave_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error('Failed to update leave status');
      alert('Leave status updated!');
      fetchLeaveRequests();
    } catch (error) {
      console.error('Update error:', error);
      alert('Error updating leave request');
    }
  };

  return (
    <div>
      <h3>Welcome, {username} ({role})</h3>
      <a href="/">Logout</a>

      {role === 'employee' && (
        <>
          <form onSubmit={handleSubmitLeave}>
            <h4>Submit Leave Request</h4>
            <label>Start Date:</label><br />
            <input name="start_date" type="date" required /><br /><br />
            <label>End Date:</label><br />
            <input name="end_date" type="date" required /><br /><br />
            <label>Reason:</label><br />
            <input name="reason" type="text" required /><br /><br />
            <button type="submit">Submit Leave</button>
          </form>

          <br />
          <form onSubmit={handleClockSubmit}>
            <h4>Log Attendance</h4>
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
                <tr><td colSpan="3">No attendance records found.</td></tr>
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
        </>
      )}

      {role === 'manager' && (
        <>
          <h4>Pending Leave Requests</h4>
          <table border="1" cellPadding="6">
            <thead>
              <tr>
                <th>Leave ID</th>
                <th>Employee ID</th>
                <th>Start</th>
                <th>End</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map(req => (
                <tr key={req.leave_id}>
                  <td>{req.leave_id}</td>
                  <td>{req.employee_id}</td>
                  <td>{req.start_date}</td>
                  <td>{req.end_date}</td>
                  <td>{req.reason}</td>
                  <td>{req.status}</td>
                  <td>
                    {req.status === 'pending' && (
                      <>
                        <button onClick={() => handleStatusUpdate(req.leave_id, 'approved')}>Approve</button>{' '}
                        <button onClick={() => handleStatusUpdate(req.leave_id, 'rejected')}>Reject</button>
                      </>
                    )}
                  </td>
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
