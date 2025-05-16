import React, { useEffect, useState } from 'react';

const ViewAllLeaveRequests = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await fetch('https://attendance-backend-vcna.onrender.com/api/leave_requests');
      const data = await res.json();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div>
      <h3>All Leave Requests</h3>
      <ul>
        {requests.map(r => (
          <li key={r.leave_id}>
            {r.employee_id} - {r.start_date} to {r.end_date} - {r.reason} - Status: {r.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewAllLeaveRequests;
