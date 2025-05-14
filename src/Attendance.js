import React from 'react';
import axios from 'axios';

function Attendance() {
  const markAttendance = async () => {
    try {
      await axios.post('http://localhost:3000/api/attendance', {
        employee_id: 101,
        status: 'present'
      });
      alert('Attendance marked');
    } catch {
      alert('Failed to mark attendance');
    }
  };

  return <button onClick={markAttendance}>Mark Attendance</button>;
}

export default Attendance;
