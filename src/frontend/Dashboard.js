import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');
  const [leaveRequests, setLeaveRequests] = useState([]);

  const fetchLeaveRequests = async () => {
    const response = await fetch('http://20.83.176.127:3000/api/leave_requests');
    const data = await response.json();
    setLeaveRequests(data);
  };

  const handleStatusUpdate = async (id, status) => {
    await fetch(`http://20.83.176.127:3000/api/leave_requests/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchLeaveRequests();
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newRequest = {
      employee_id: username,
      start_date: form.start_date.value,
      end_date: form.end_date.value,
      reason: form.reason.value,
      status: 'pending'
    };

    await fetch('http://20.83.176.127:3000/api/leave_requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRequest),
    });

    fetchLeaveRequests();
    form.reset();
  };

  return (
    <div>
      <h3>Welcome, {username} ({role})</h3>
      <a href="/">Logout</a>

      {role === 'employee' && (
        <form onSubmit={handleSubmit}>
          <h4>Submit Leave Request</h4>
          <input name="start_date" type="date" required />
          <input name="end_date" type="date" required />
          <input name="reason" placeholder="Reason" required />
          <button type="submit">Submit</button>
        </form>
      )}

      {role === 'manager' && (
        <>
          <h4>Pending Leave Requests</h4>
          <table border="1" cellPadding="6">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Start</th>
                <th>End</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((req) => (
                <tr key={req.id}>
                  <td>{req.employee_id}</td>
                  <td>{req.start_date}</td>
                  <td>{req.end_date}</td>
                  <td>{req.reason}</td>
                  <td>{req.status}</td>
                  <td>
                    {req.status === 'pending' && (
                      <>
                        <button onClick={() => handleStatusUpdate(req.id, 'approved')}>Approve</button>
                        <button onClick={() => handleStatusUpdate(req.id, 'rejected')}>Reject</button>
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
