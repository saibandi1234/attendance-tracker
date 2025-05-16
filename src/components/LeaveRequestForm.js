import React, { useState } from 'react';

const LeaveRequestForm = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const username = localStorage.getItem('username');

  const handleSubmit = async (e) => {
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
      const res = await fetch('https://attendance-backend-vcna.onrender.com/api/leave_requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRequest),
      });

      if (!res.ok) throw new Error('Failed to submit request');
      alert('Leave request submitted!');
      form.reset();
    } catch (error) {
      console.error('Submission error:', error);
      alert('Error submitting leave request');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://attendance-backend-vcna.onrender.com/api/leave_requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leave_id: Math.floor(Math.random() * 10000),
          employee_id: localStorage.getItem('username'),
          start_date: startDate,
          end_date: endDate,
          reason: reason,
          status: 'pending'
        }),
      });
      if (response.ok) {
        alert('Leave request submitted');
      } else {
        alert('Failed to submit leave request');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error while submitting leave');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Start Date:</label><br />
      <input name="start_date" type="date" required /><br /><br />
      <label>End Date:</label><br />
      <input name="end_date" type="date" required /><br /><br />
      <label>Reason:</label><br />
      <input name="reason" type="text" required /><br /><br />
      <button type="submit">Submit Leave</button>
    </form>
    <div>
      <h3>Leave Request Form</h3>
      <form onSubmit={handleSubmit}>
        <input type="date" onChange={(e) => setStartDate(e.target.value)} required placeholder="Start Date" />
        <input type="date" onChange={(e) => setEndDate(e.target.value)} required placeholder="End Date" />
        <input placeholder="Reason" onChange={(e) => setReason(e.target.value)} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LeaveRequestForm;
