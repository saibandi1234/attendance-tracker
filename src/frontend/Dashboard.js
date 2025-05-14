import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  const fetchLeaveRequests = async () => {
    try {
      const response = await fetch('http://20.83.176.127:3000/api/leave_requests');
      const data = await response.json();
      setLeaveRequests(data);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await fetch(`http://20.83.176.127:3000/api/leave_requests/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      alert(`Request ${status}`);
      fetchLeaveRequests(); // Refresh data
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  return (
    <div>
      <h2>Manager Dashboard – Leave Requests</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Start</th>
            <th>End</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((req) => (
            <tr key={req.id}>
              <td>{req.employee_id}</td>
              <td>{req.start_date}</td>
              <td>{req.end_date}</td>
              <td>{req.reason}</td>
              <td>{req.status}</td>
              <td>
                {req.status === 'pending' && (
                  <>
                    <button onClick={() => handleStatusUpdate(req.id, 'approved')}>Approve</button>{' '}
                    <button onClick={() => handleStatusUpdate(req.id, 'rejected')}>Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
