import React, { useEffect, useState } from 'react';

const AttendanceLogs = () => {
  const [logs, setLogs] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchLogs = async () => {
      if (!username) return;
      try {
        const res = await fetch(`https://attendance-backend-vcna.onrender.com/api/attendance?emp_id=${username}`);
        const data = await res.json();
        setLogs(data.reverse());
      } catch (err) {
        console.error("Error fetching logs:", err);
      }
    };
    fetchLogs();
  }, [username]);

  return (
    <div className="p-4 bg-white rounded shadow" style={{ padding: '1rem', backgroundColor: '#fff', borderRadius: '10px' }}>
      <h3 className="text-lg font-semibold mb-2">Your Attendance Logs</h3>
      {logs.length === 0 ? (
        <p>No logs found.</p>
      ) : (
        <ul className="space-y-2 text-sm max-h-64 overflow-y-auto">
          {logs.map((log, index) => (
            <li key={index} className="border p-2 rounded">
              <strong>{log.status}</strong> at {new Date(log.log_time).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AttendanceLogs;
