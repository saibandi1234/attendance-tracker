import React, { useState } from 'react';

const LeaveRequestForm = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const leaveRequest = {
      leave_id: Date.now(),
      employee_id: localStorage.getItem('username'),
      start_date: startDate,
      end_date: endDate,
      reason,
      status: 'pending',
    };

    try {
      const res = await fetch('https://attendance-backend-vcna.onrender.com/api/leave_requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leaveRequest),
      });
      if (res.ok) {
        alert('Leave Request Submitted!');
        setStartDate('');
        setEndDate('');
        setReason('');
      } else {
        alert('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting leave request:', error);
    }
  };

  return (
    <div className="card p-4 shadow-sm">
      <h4>Leave Request Form</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Start Date</label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>End Date</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Reason</label>
          <input
            type="text"
            className="form-control"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason"
            required
          />
        </div>
        <button className="btn btn-primary w-100" type="submit">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default LeaveRequestForm;
