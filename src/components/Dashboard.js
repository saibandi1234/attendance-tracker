import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');
  const [leaveRequests, setLeaveRequests] = useState([]);

  const fetchLeaveRequests = async () => {
    try {
      const response = await fetch('https://attendance-backend-vcna.onrender.com/api/leave_requests');
      const data = await response.json();
      setLeaveRequests(data);
console.log("Fetched leave requests:", data);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newRequest = {
      employee_id: parseInt(username),
      start_date: form.start_date.value,
      end_date: form.end_date.value,
      reason: form.reason.value,
      status: 'pending',
    };

    console.log("Submitting leave request:", newRequest);


    try {
     const response = await fetch('https://attendance-backend-vcna.onrender.com/api/leave_requests', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(newRequest),
   }); 

      if (!response.ok) {
        throw new Error('Failed to submit request');
      }

      alert('Leave request submitted successfully!');
      fetchLeaveRequests();
      form.reset();
    } catch (error) {
      console.error('Submission error:', error);
      alert('Error submitting leave request');
    }
  };

const handleStatusUpdate = async (leave_id, status) => {
  console.log("Updating leave_id:", leave_id, "Status:", status);

  try {
    const res = await fetch(`https://attendance-backend-vcna.onrender.com/api/leave_requests/${leave_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      throw new Error('Failed to update');
    }

    alert('Leave request updated successfully');
    fetchLeaveRequests();
  } catch (error) {
    console.error('Error updating request:', error);
    alert('Error updating leave request');
  }
};

  return (
    <div>
      <h3>Welcome, {username} ({role})</h3>
      <a href="/">Logout</a>

      {/* Employee View */}
      {role === 'employee' && (
        <form onSubmit={handleSubmit}>
          <h4>Submit Leave Request</h4>

          <label>Start Date:</label><br />
          <input name="start_date" type="date" required /><br /><br />

          <label>End Date:</label><br />
          <input name="end_date" type="date" required /><br /><br />

          <label>Reason:</label><br />
          <input name="reason" type="text" placeholder="Reason for leave" required /><br /><br />

          <button type="submit">Submit</button>
        </form>
      )}

      {/* Manager View */}
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
    <tr key={req.leave_id}>
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

