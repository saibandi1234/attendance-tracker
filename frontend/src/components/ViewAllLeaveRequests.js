import React, { useEffect, useState } from 'react';

const ViewAllLeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const res = await fetch('https://attendance-backend-vcna.onrender.com/api/leave_requests');
        const data = await res.json();
        setLeaveRequests(data.reverse());
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      }
    };

    fetchLeaveRequests();
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl shadow-md mt-6">
      <h3 className="text-xl font-semibold text-purple-800 mb-4">All Leave Requests</h3>
      <table className="w-full border">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((req, index) => (
            <tr key={index}>
              <td>{req.employee_id}</td>
              <td>{new Date(req.start_date).toLocaleDateString()}</td>
              <td>{new Date(req.end_date).toLocaleDateString()}</td>
              <td>{req.reason}</td>
              <td>{req.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAllLeaveRequests;
