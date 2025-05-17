import React, { useState } from 'react';

const AttendanceForm = () => {
  const username = localStorage.getItem('username');
  const [status, setStatus] = useState('clock_in');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://attendance-backend-vcna.onrender.com/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emp_id: username, status }),
      });
      if (response.ok) {
        alert(`Attendance ${status.replace('_', ' ')} recorded`);
      } else {
        alert('Error logging attendance');
      }
    } catch (err) {
      console.error('Error logging attendance:', err);
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
      <h3>Attendance</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="radio" value="clock_in" checked={status === 'clock_in'} onChange={(e) => setStatus(e.target.value)} />
          Clock In
        </label><br />
        <label>
          <input type="radio" value="clock_out" checked={status === 'clock_out'} onChange={(e) => setStatus(e.target.value)} />
          Clock Out
        </label><br /><br />

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

export default AttendanceForm;
