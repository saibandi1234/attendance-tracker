import React, { useState, useEffect } from 'react';

const ClockInOut = () => {
  const [status, setStatus] = useState('Clock In');
  const username = localStorage.getItem('username');
  const [logs, setLogs] = useState([]);

  const handleClock = async () => {
    const payload = {
      employee_id: username,
      status,
      log_time: new Date().toISOString()
    };

    try {
      await fetch('https://attendance-backend-vcna.onrender.com/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      setStatus(prev => (prev === 'Clock In' ? 'Clock Out' : 'Clock In'));
      fetchLogs();
    } catch (err) {
      alert('Error clocking in/out');
    }
  };

  const fetchLogs = async () => {
    try {
      const res = await fetch(`https://attendance-backend-vcna.onrender.com/api/attendance?emp_id=${username}`);
      const data = await res.json();
      setLogs(data.reverse());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="mt-4">
      <button onClick={handleClock} className="bg-green-600 text-white px-4 py-2 rounded">
        {status}
      </button>
      <ul className="mt-2 space-y-1">
        {logs.map((log, index) => (
          <li key={index}>
            {log.status} at {new Date(log.log_time).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClockInOut;

