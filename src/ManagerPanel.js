import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ManagerPanel() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/leave_requests')
      .then(res => setRequests(res.data))
      .catch(console.error);
  }, []);

  const handleUpdate = async (id, status) => {
    await axios.put(`http://localhost:3000/api/leave_requests/${id}`, { status });
    alert(`Request ${status}`);
  };

  return (
    <div>
      <h3>Pending Requests</h3>
      {requests.filter(r => r.status === 'pending').map(req => (
        <div key={req.id}>
          <p>{req.employee_id}: {req.start_date} - {req.end_date}</p>
          <button onClick={() => handleUpdate(req.id, 'approved')}>Approve</button>
          <button onClick={() => handleUpdate(req.id, 'rejected')}>Reject</button>
        </div>
      ))}
    </div>
  );
}

export default ManagerPanel;
