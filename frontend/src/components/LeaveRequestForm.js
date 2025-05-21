import React, { useEffect, useState } from 'react';

const LeaveRequestFormClean = () => {
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { emp_id, start_date, end_date, reason } = formData;

    console.log("📤 Sending this data:", JSON.stringify(formData, null, 2));

    if (!emp_id || !start_date || !end_date || !reason) {
      alert('❌ Missing required fields');
      return;
    }

    try {
      const response = await fetch('https://attendance-backend-vcna.onrender.com/api/leave_requests', {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emp_id, start_date, end_date, reason })
      });

      const result = await response.json();

      if (response.ok) {
        alert('✅ Leave request submitted!');
        setFormData({ emp_id, start_date: '', end_date: '', reason: '' });
      } else {
        alert(`❌ Failed: ${result.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert('❌ Server error during submission');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="date" name="start_date" onChange={handleChange} value={formData.start_date} />
      <input type="date" name="end_date" onChange={handleChange} value={formData.end_date} />
      <input type="text" name="reason" onChange={handleChange} value={formData.reason} placeholder="Reason" />
      <button type="submit">Submit Leave</button>
    </form>
  );
};

export default LeaveRequestFormClean;

