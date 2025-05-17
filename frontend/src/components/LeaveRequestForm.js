import React, { useState } from 'react';

const LeaveRequestForm = () => {
  const username = localStorage.getItem('username');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://attendance-backend-vcna.onrender.com/api/leave_requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employee_id: username, start_date: startDate, end_date: endDate, reason }),
      });
      if (response.ok) {
        alert('Leave request submitted');
        setStartDate('');
        setEndDate('');
        setReason('');
      } else {
        alert('Error submitting leave request');
      }
    } catch (err) {
      console.error('Error submitting leave request:', err);
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '50px auto',
      padding: '30px',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h3>Leave Request</h3>
      <form onSubmit={handleSubmit}>
        <label>Start Date:</label><br />
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required /><br /><br />

        <label>End Date:</label><br />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required /><br /><br />

        <label>Reason:</label><br />
        <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} required /><br /><br />

        <button type="submit" style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default LeaveRequestForm;
