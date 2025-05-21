import React, { useState } from 'react';

const AttendanceForm = () => {
  const [status, setStatus] = useState('Clock In');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://attendance-backend-vcna.onrender.com/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employee_id: localStorage.getItem('username'),
          log_time: new Date().toISOString(),
          status: status
        }),
      });
      if (response.ok) {
        alert(`${status} logged`);
      } else {
        alert('Failed to log attendance');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error while logging attendance');
    }
  };

  return (
    <div>
      <h3>Clock In/Clock Out Form</h3>
      <form onSubmit={handleSubmit}>
        <select onChange={(e) => setStatus(e.target.value)}>
          <option>Clock In</option>
          <option>Clock Out</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AttendanceForm;
