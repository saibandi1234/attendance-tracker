import React, { useState } from 'react';
import axios from 'axios';

function LeaveRequestForm() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/leave_requests', {
        employee_id: 101,
        start_date: startDate,
        end_date: endDate,
        reason,
        status: 'pending'
      });
      alert('Leave request submitted');
    } catch {
      alert('Submission failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Request Leave</h3>
      <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
      <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required />
      <textarea placeholder="Reason" value={reason} onChange={e => setReason(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default LeaveRequestForm;
