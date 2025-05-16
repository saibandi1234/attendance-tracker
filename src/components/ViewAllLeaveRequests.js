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
        fetchRequests();
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
    <div style={{ padding: '20px' }}>
      <h3>All Leave Requests</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {requests.map(r => {
          console.log('DEBUG LEAVE STATUS:', r.status); // Debugging status only
          return (
            <li key={r.leave_id} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
              <strong>{r.employee_id}</strong> - {r.start_date} to {r.end_date} - {r.reason} - 
              <span style={{ padding: '2px 6px', backgroundColor: '#e0e0e0', marginLeft: '5px', borderRadius: '4px' }}>{r.status}</span>
              {r.status && r.status.trim().toLowerCase() === 'pending' && (
                <>
                  <button 
                    onClick={() => updateStatus(r.leave_id, 'approved')} 
                    style={{ marginLeft: '10px', backgroundColor: 'green', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => updateStatus(r.leave_id, 'rejected')} 
                    style={{ marginLeft: '5px', backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Reject
                  </button>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ViewAllLeaveRequests;
