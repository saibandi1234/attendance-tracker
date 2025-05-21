import React, { useEffect, useState } from 'react';

const ViewAllLeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    fetch('https://attendance-backend-vcna.onrender.com/api/leave_requests')
      .then((res) => res.json())
      .then((data) => {
        setLeaveRequests(data.reverse());
      })
      .catch((err) => console.error('Failed to fetch leave requests:', err));
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl shadow-md mt-6">
      <h3 className="text-xl font-bold text-purple-800 mb-4">All Leave Requests</h3>
      <table className="w-full table-auto border-collapse border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Employee ID</th>
            <th className="border px-4 py-2">Start Date</th>
            <th className="border px-4 py-2">End Date</th>
            <th className="border px-4 py-2">Reason</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((req, idx) => (
            <tr key={idx}>
              <td className="border px-4 py-2">{req.employee_id}</td>
              <td className="border px-4 py-2">{req.start_date}</td>
              <td className="border px-4 py-2">{req.end_date}</td>
              <td className="border px-4 py-2">{req.reason}</td>
              <td className="border px-4 py-2">{req.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAllLeaveRequests;
