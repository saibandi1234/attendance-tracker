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

  const updateStatus = async (leave_id, status) => {
    try {
      const res = await fetch(`https://attendance-backend-vcna.onrender.com/api/leave_requests/${leave_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        alert(`Leave request ${leave_id} updated to ${status}`);
        fetchRequests(); // Refresh after update
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
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
            {r.status === 'pending' && (
              <>
                <button onClick={() => updateStatus(r.leave_id, 'approved')}>Approve</button>
                <button onClick={() => updateStatus(r.leave_id, 'rejected')}>Reject</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewAllLeaveRequests;
