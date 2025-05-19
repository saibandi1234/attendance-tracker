import React, { useEffect, useState } from 'react';

const AttendanceLogs = () => {
  const [logs, setLogs] = useState([]);
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch(`https://attendance-backend-vcna.onrender.com/api/attendance?emp_id=${username}`);
        const data = await res.json();
        setLogs(data.reverse());
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg mt-6">
      <h3 className="text-lg font-bold text-purple-800 mb-4">Your Attendance Logs</h3>
      <ul className="space-y-2 text-sm">
        {logs.map((log, index) => (
          <li key={index} className="p-2 border rounded-md">
            <strong>{log.action}</strong> at {new Date(log.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttendanceLogs;
