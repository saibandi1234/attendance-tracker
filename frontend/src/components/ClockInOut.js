import React, { useState, useEffect } from 'react';

const ClockInOut = () => {
  const username = localStorage.getItem('username');
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState('Clock In');

  const handleClock = async () => {
const timestamp = new Date().toISOString(); // ✅ valid ISO format

const payload = {
  emp_id: username,
  action,
  timestamp,
};

    try {
      const res = await fetch('https://attendance-backend-vcna.onrender.com/api/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus((prev) => (prev === 'Clock In' ? 'Clock Out' : 'Clock In'));
        fetchLogs(); // refresh logs
      } else {
        console.error('Clock-in failed:', res.status);
      }
    } catch (error) {
      console.error('Error logging attendance:', error);
    }
  };

  const fetchLogs = async () => {
    try {
      const res = await fetch(`https://attendance-backend-vcna.onrender.com/api/attendance?emp_id=${username}`);
      const data = await res.json();
      setLogs(data.reverse());
    } catch (err) {
      console.error('Error fetching logs:', err);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl shadow-md mt-6">
      <h3 className="text-xl font-semibold text-purple-800 mb-4">Clock In / Out</h3>
      <button
        onClick={handleClock}
        className={`px-6 py-3 rounded-lg text-white font-semibold ${
          status === 'Clock In' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
        }`}
      >
        {status}
      </button>

      <div className="mt-6">
        <h4 className="font-medium text-gray-700 mb-2">Your Attendance Logs</h4>
<ul className="space-y-2 text-sm max-h-64 overflow-y-auto">
  {logs.map((log, index) => (
    <li key={index} className="p-2 border rounded-md">
<strong>{log.status}</strong> at{' '}
{log.log_time && !isNaN(new Date(log.log_time))
  ? new Date(log.log_time).toLocaleString()
  : 'Invalid or missing timestamp'}
    </li>
  ))}
</ul>
        </ul>
      </div>
    </div>
  );
};

export default ClockInOut;
