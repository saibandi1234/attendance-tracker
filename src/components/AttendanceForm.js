import React, { useState } from 'react';

const AttendanceForm = () => {
  const [type, setType] = useState('Clock In');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://your-render-backend-url.onrender.com/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emp_id: localStorage.getItem('username'),
          log_type: type,
        }),
      });
      if (response.ok) {
        alert(`${type} successful`);
      } else {
        alert('Failed to submit attendance');
      }
    } catch (error) {
      console.error(error);
      alert('Error while submitting attendance');
    }
  };

  return (
    <div>
      <h3>Clock In/Clock Out Form</h3>
      <form onSubmit={handleSubmit}>
        <select onChange={(e) => setType(e.target.value)}>
          <option>Clock In</option>
          <option>Clock Out</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AttendanceForm;
