import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LeaveStatusTable() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/leave_requests?employee_id=101')
      .then(res => setRequests(res.data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h3>Your Leave Requests</h3>
      <table>
        <thead>
          <tr>
            <th>From</th><th>To</th><th>Reason</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(req => (
            <tr key={req.id}>
              <td>{req.start_date}</td>
              <td>{req.end_date}</td>
              <td>{req.reason}</td>
              <td>{req.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaveStatusTable;
