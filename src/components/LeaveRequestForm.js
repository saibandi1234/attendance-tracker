import React, { useState } from 'react';

const LeaveRequestForm = () => {
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
