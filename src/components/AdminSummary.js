import React, { useEffect, useState } from 'react';

const AdminSummary = () => {
  const [summary, setSummary] = useState({});

  const fetchSummary = async () => {
    const res = await fetch('https://attendance-backend-vcna.onrender.com/api/admin/summary');
    const data = await res.json();
    setSummary(data);
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <div>
      <h3>Admin Summary</h3>
      <p>Total Employees: {summary.totalEmployees}</p>
      <p>Total Leave Requests: {summary.totalLeaveRequests}</p>
      <p>Approved Leaves: {summary.approvedLeaves}</p>
      <p>Pending Leaves: {summary.pendingLeaves}</p>
      <p>Rejected Leaves: {summary.rejectedLeaves}</p>
    </div>
  );
};

export default AdminSummary;
