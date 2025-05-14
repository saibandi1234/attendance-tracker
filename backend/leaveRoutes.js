const express = require('express');
const router = express.Router();

// Sample data, replace with actual database logic later
let leaveRequests = [
  { id: 1, employee_id: 'E001', start_date: '2025-05-01', end_date: '2025-05-05', reason: 'Sick', status: 'approved' },
  { id: 2, employee_id: 'E002', start_date: '2025-05-10', end_date: '2025-05-12', reason: 'Vacation', status: 'pending' }
];

// GET route to fetch all leave requests
router.get('/', (req, res) => {
  res.json(leaveRequests);
});

// POST route to create a new leave request
router.post('/', (req, res) => {
  const { employee_id, start_date, end_date, reason, status } = req.body;
  const newLeaveRequest = {
    id: leaveRequests.length + 1, // Example, you can implement a better way to generate unique IDs
    employee_id,
    start_date,
    end_date,
    reason,
    status
  };
  leaveRequests.push(newLeaveRequest);
  res.status(201).json(newLeaveRequest);
});

module.exports = router;
