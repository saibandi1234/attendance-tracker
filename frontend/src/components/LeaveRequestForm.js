import React, { useState } from 'react';

const LeaveRequestForm = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const empId = localStorage.getItem("username");

    if (!empId || !startDate || !endDate || !reason) {
      alert("All fields are required");
      return;
    }

    const payload = {
      employee_id: empId,
      start_date: startDate,
      end_date: endDate,
      reason,
      status: 'pending'
    };

    try {
      const response = await fetch("https://attendance-backend-vcna.onrender.com/api/leave_requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert("✅ Leave request submitted!");
        setStartDate('');
        setEndDate('');
        setReason('');
      } else {
        const errorText = await response.text();
        alert(`❌ Failed: ${errorText}`);
      }
    } catch (error) {
      alert("⚠️ Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
      <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason" required />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
};

export default LeaveRequestForm;
