import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [formData, setFormData] = useState({
    employee_id: '',
    start_date: '',
    end_date: '',
    reason: '',
    status: 'pending',
  });

  const [leaveRequests, setLeaveRequests] = useState([]);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://attendance-backend-vcna.onrender.com/api/leave_requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Leave request submitted successfully');
        fetchLeaveRequests(); // Refresh the table
      } else {
        setMessage('Failed to submit leave request');
      }
    } catch (error) {
      setMessage('Server error');
    }
  };

  const fetchLeaveRequests = async () => {
    try {
      const response = await fetch('https://attendance-backend-vcna.onrender.com/api/leave_requests');
      const data = await response.json();
      setLeaveRequests(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  return (
    <div>
      <h2>Submit Leave Request</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="employee_id"
          placeholder="Employee ID"
          value={formData.employee_id}
          onChange={handleChange}
        /><br /><br />
        <input
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
        /><br /><br />
        <input
          type="date"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
        /><br /><br />
        <input
          type="text"
          name="reason"
          placeholder="Reason"
          value={formData.reason}
          onChange={handleChange}
        /><br /><br />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
        </select><br /><br />
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>

      <h3>All Leave Requests</h3>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee ID</th>
            <th>Start</th>
            <th>End</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.id}</td>
              <td>{leave.employee_id}</td>
              <td>{leave.start_date}</td>
              <td>{leave.end_date}</td>
              <td>{leave.reason}</td>
              <td>{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
