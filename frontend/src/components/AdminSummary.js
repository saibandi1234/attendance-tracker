import React from 'react';

const AdminSummary = () => {
  // Temporary employee list for demo purposes
  const employees = [
    '101', '102', '103', '104', '105', // you can add as many as you want
    '106', '107', '108', '109', '110',
  ];

  const totalEmployees = employees.length;

  return (
    <div className="p-6 bg-white rounded-xl shadow-md mt-6">
      <h3 className="text-xl font-bold text-purple-800 mb-4">Admin Summary</h3>
      <ul className="space-y-2 text-gray-700">
        <li><strong>Total Employees:</strong> {totalEmployees}</li>
        <li><strong>Total Managers:</strong> 1</li>
        <li><strong>Total Admins:</strong> 1</li>
        <li><strong>Clock-In Logs:</strong> Stored in backend</li>
        <li><strong>Leave Requests:</strong> Manager can view pending requests</li>
      </ul>
    </div>
  );
};

export default AdminSummary;
