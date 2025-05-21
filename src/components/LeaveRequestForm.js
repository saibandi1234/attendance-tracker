import React, { useState, useEffect } from 'react';

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
  
  const [formData, setFormData] = useState({
    emp_id: '',
    start_date: '',
    end_date: '',
    reason: ''
  });

  useEffect(() => {
    const emp_id = localStorage.getItem('username');
    if (emp_id) {
      setFormData(prev => ({ ...prev, emp_id }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { emp_id, start_date, end_date, reason } = formData;

    if (!emp_id || !start_date || !end_date || !reason) {
      alert('❌ Failed: Missing required fields');
      return;
    }

    try {
const response = await fetch('https://attendance-backend-vcna.onrender.com/api/leave_requests', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});

      const result = await response.json();

      if (response.ok) {
        alert('✅ Leave request submitted successfully');
        setFormData({ emp_id, start_date: '', end_date: '', reason: '' });
      } else {
        alert(`❌ Failed: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('❌ Submission failed due to server error');
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
    <div className="card p-4 shadow-sm">
      <h4>Leave Request Form</h4>
    <div>
      <h2>Leave Request Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} />
        <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} />
        <input type="text" name="reason" value={formData.reason} onChange={handleChange} placeholder="Reason" />
        <button type="submit">Submit Leave</button>
      </form>
    </div>
  );
};

export default LeaveRequestForm;
