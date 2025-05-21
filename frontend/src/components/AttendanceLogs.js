import React, { useState, useEffect } from 'react';

const AttendanceLogs = () => {
  const [logs, setLogs] = useState([]);
  const empId = localStorage.getItem("username");

  useEffect(() => {
    fetch(`https://attendance-backend-vcna.onrender.com/api/attendance?emp_id=${empId}`)
      .then((res) => res.json())
      .then((data) => setLogs(data.reverse()))
      .catch((err) => console.error("Error fetching logs:", err));
  }, [empId]);

  return (
    <div className="mt-6">
      <h4 className="font-semibold text-gray-700 mb-2">Your Attendance Logs</h4>
      {logs.length === 0 ? (
        <p className="text-gray-500">No logs found.</p>
      ) : (
        <ul className="space-y-2 text-sm max-h-64 overflow-y-auto">
          {logs.map((log, index) => (
            <li key={index} className="p-2 border rounded-md">
              <strong>{log.status}</strong> at{" "}
              {new Date(log.log_time).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AttendanceLogs;
