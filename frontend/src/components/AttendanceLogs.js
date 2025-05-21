import React, { useEffect, useState } from 'react';

const AttendanceLogs = () => {
  const [logs, setLogs] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchLogs = async () => {
      if (!username || username.trim() === '') {
        console.error("❌ Username is missing or invalid in localStorage");
        return;
      }

      try {
        const res = await fetch(`https://attendance-backend-vcna.onrender.com/api/attendance?emp_id=${username}`);
        if (!res.ok) {
          console.error(`❌ Server responded with status ${res.status}`);
          return;
        }
        const data = await res.json();
        setLogs(data.reverse());
      } catch (err) {
        console.error("❌ Network or parsing error while fetching logs:", err);
      }
    };

    fetchLogs();
  }, [username]);

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
      <h4 className="text-lg font-semibold mb-2">Your Attendance Logs</h4>
      {logs.length === 0 ? (
        <p className="text-sm text-gray-600">No attendance logs available.</p>
      ) : (
        <ul className="space-y-2 text-sm max-h-60 overflow-y-auto">
          {logs.map((log, index) => (
            <li key={index} className="p-2 border rounded">
              <strong>{log.status}</strong> at {new Date(log.log_time).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AttendanceLogs;
