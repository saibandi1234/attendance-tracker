import React, { useEffect, useState } from 'react';

const LeaveStatusTable = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const username = localStorage.getItem('username');

  const fetchLeaveRequests = async () => {
    try {
      const res = await fetch('https://attendance-backend-vcna.onrender.com/api/leave_requests');
      const data = await res.json();
      setLeaveRequests(data);
    } catch (err) {
      console.error('Error fetching leave requests:', err);
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  return (
    <table border="1" cellPadding="6">
      <thead>
        <tr>
          <th>Leave ID</th>
          <th>Start</th>
          <th>End</th>
          <th>Reason</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {leaveRequests
          .filter(req => req.employee_id == username)
          .map(req => (
            <tr key={req.leave_id}>
              <td>{req.leave_id}</td>
              <td>{req.start_date}</td>
              <td>{req.end_date}</td>
              <td>{req.reason}</td>
              <td>{req.status}</td>
            </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeaveStatusTable;
