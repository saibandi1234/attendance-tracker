import React, { useEffect, useState } from 'react';

const AdminSummary = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch('https://attendance-backend-vcna.onrender.com/api/employees');
        const data = await res.json();
        setTotalEmployees(data.length);
      } catch (err) {
        console.error("Error fetching employee count:", err);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-lg font-semibold mb-2">Admin Summary</h3>
      <p>Total Employees: {totalEmployees}</p>
    </div>
  );
};

export default AdminSummary;
