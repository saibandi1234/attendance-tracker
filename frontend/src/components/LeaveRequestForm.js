import React, { useState } from 'react';

const LeaveRequestForm = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();
  const empId = localStorage.getItem("username");

  if (!empId) {
    alert("⚠️ Login required. Please log in again.");
    return;
  }

  const payload = {
    employee_id: empId,
    start_date: startDate,
    end_date: endDate,
    reason: reason,
    status: "pending"
  };

  console.log("🚀 Payload being submitted:", payload);

  if (!payload.employee_id || !payload.start_date || !payload.end_date || !payload.reason) {
    alert("❌ Cannot submit: one or more fields are missing");
    return;
  }

  try {
    const response = await fetch("https://attendance-backend-vcna.onrender.com/api/leave_requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
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
    console.error("Error submitting leave request:", error);
    alert("⚠️ Something went wrong while submitting leave");
  }
};

  return (
    <div className="p-6 bg-white rounded-xl shadow-md mt-6">
      <h3 className="text-xl font-semibold mb-4">Leave Request Form</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label>Reason</label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            className="border p-2 rounded w-full"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LeaveRequestForm;
