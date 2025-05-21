import React, { useEffect, useState } from 'react';

const AdminSummary = () => {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [leaveStats, setLeaveStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  useEffect(() => {
    fetch('https://attendance-backend-vcna.onrender.com/api/attendance')
      .then((res) => res.json())
      .then((data) => {
        const uniqueEmpIds = new Set(data.map((entry) => entry.employee_id));
        setEmployeeCount(uniqueEmpIds.size);
      })
      .catch((err) => console.error("Error fetching attendance logs:", err));
  }, []);

  useEffect(() => {
    fetch('https://attendance-backend-vcna.onrender.com/api/leave_requests')
      .then((res) => res.json())
      .then((data) => {
        const approved = data.filter((req) => req.status === 'approved').length;
        const pending = data.filter((req) => req.status === 'pending').length;
        const rejected = data.filter((req) => req.status === 'rejected').length;
        setLeaveStats({
          total: data.length,
          approved,
          pending,
          rejected,
        });
      })
      .catch((err) => console.error("Error fetching leave requests:", err));
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl shadow-md mt-6">
      <h3 className="text-xl font-bold text-purple-800 mb-4">Admin Summary</h3>
      <ul className="space-y-2 text-gray-700">
        <li><strong>Total Employees:</strong> {employeeCount}</li>
        <li><strong>Total Leave Requests:</strong> {leaveStats.total}</li>
        <li><strong>Approved Leaves:</strong> {leaveStats.approved}</li>
        <li><strong>Pending Leaves:</strong> {leaveStats.pending}</li>
        <li><strong>Rejected Leaves:</strong> {leaveStats.rejected}</li>
      </ul>
    </div>
  );
};

export default AdminSummary;
