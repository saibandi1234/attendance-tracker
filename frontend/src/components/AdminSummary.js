import React, { useState, useEffect } from 'react';

const [loading, setLoading] = useState(true);
const AdminSummary = () => {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [leaveStats, setLeaveStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

useEffect(() => {
  Promise.all([
    fetch('https://attendance-backend-vcna.onrender.com/api/attendance').then(res => res.json()),
    fetch('https://attendance-backend-vcna.onrender.com/api/leave_requests').then(res => res.json())
  ])
  .then(([attendanceData, leaveData]) => {
    const uniqueEmpIds = new Set(attendanceData.map(log => log.employee_id));
    setEmployeeCount(uniqueEmpIds.size);

    const approved = leaveData.filter(req => req.status === 'approved').length;
    const pending = leaveData.filter(req => req.status === 'pending').length;
    const rejected = leaveData.filter(req => req.status === 'rejected').length;
    setLeaveStats({
      total: leaveData.length,
      approved,
      pending,
      rejected
    });
  })
  .catch((err) => {
    console.error("Error loading admin summary:", err);
  })
  .finally(() => setLoading(false));
}, []);

if (loading) return <div className="text-center p-6">Loading admin summary...</div>;
  return (
    <div className="p-6 bg-white rounded-xl shadow-md mt-6">
      <h3 className="text-xl font-bold text-purple-800 mb-4">Admin Summary</h3>
      <ul className="space-y-2 text-gray-700">
        <li><strong>Total Employees:</strong> {employeeCount}</li>
        <li><strong>Total Leave Requests:</strong> {leaveStats.total}</li>
<li><strong>Approved Leaves:</strong> <span className="text-green-600">{leaveStats.approved}</span></li>
<li><strong>Pending Leaves:</strong> <span className="text-yellow-600">{leaveStats.pending}</span></li>
<li><strong>Rejected Leaves:</strong> <span className="text-red-600">{leaveStats.rejected}</span></li>
      </ul>
    </div>
  );
};

export default AdminSummary;
