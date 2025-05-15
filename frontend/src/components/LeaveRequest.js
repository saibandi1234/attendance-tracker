import React, { useEffect, useState } from 'react';

const LeaveRequest = () => {
  const [requests, setRequests] = useState([]);
  const username = localStorage.getItem('username');

  const fetchRequests = async () => {
    try {
      const res = await fetch('https://attendance-backend-vcna.onrender.com/api/leave_requests');
      const data = await res.json();
      setRequests(data.filter(r => r.employee_id == username));
    } catch (err) {
      console.error('Error fetching leave requests:', err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const newReq = {
      leave_id: requests.length + 1,
      employee_id: parseInt(username),
      start_date: form.start_date.value,
      end_date: form.end_date.value,
      reason: form.reason.value,
      status: 'pending'
    };

    try {
      await fetch('https://attendance-backend-vcna.onrender.com/api/leave_requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReq)
      });

      alert('Leave request submitted!');
      fetchRequests();
      form.reset();
    } catch (err) {
      alert('Failed to submit leave request.');
    }
  };

  return (
    <div>
      <h3>Submit Leave Request</h3>
      <form onSubmit={handleSubmit}>
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
          <tr>
            <th>Leave ID</th>
            <th>Start</th>
            <th>End</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(r => (
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
    </div>
  );
};

export default LeaveRequest;
