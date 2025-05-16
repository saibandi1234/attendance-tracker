import React, { useState } from 'react';

const LeaveRequestForm = () => {
  const [reason, setReason] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://attendance-backend-vcna.onrender.com/api/leave_requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emp_id: localStorage.getItem('username'),
          leave_date: date,
          reason: reason,
        }),
      });
      if (response.ok) {
        alert('Leave requested successfully');
      } else {
        alert('Failed to request leave');
      }
    } catch (error) {
      console.error(error);
      alert('Error while requesting leave');
    }
  };

  return (
    <div>
      <h3>Leave Request Form</h3>
      <form onSubmit={handleSubmit}>
        <input type="date" onChange={(e) => setDate(e.target.value)} required />
        <input placeholder="Reason" onChange={(e) => setReason(e.target.value)} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LeaveRequestForm;
