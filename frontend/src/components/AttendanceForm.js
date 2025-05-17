import React, { useState } from 'react';

const AttendanceForm = () => {
  const [status, setStatus] = useState('clock-in');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const attendanceLog = {
      employee_id: localStorage.getItem('username'),
      log_time: new Date().toISOString(),
      status,
    };

    try {
      const res = await fetch('https://attendance-backend-vcna.onrender.com/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attendanceLog),
      });
      if (res.ok) {
        alert('Attendance logged successfully!');
      } else {
        alert('Logging failed');
      }
    } catch (error) {
      console.error('Error logging attendance:', error);
    }
  };

  return (
    <div className="card p-4 shadow-sm">
      <h4>Clock In / Clock Out</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Status</label>
          <select
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="clock-in">Clock In</option>
            <option value="clock-out">Clock Out</option>
          </select>
        </div>
        <button className="btn btn-success w-100" type="submit">
          Submit Attendance
        </button>
      </form>
    </div>
  );
};

export default AttendanceForm;
