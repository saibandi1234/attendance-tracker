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
  );
};

export default LeaveRequestForm;
