const express = require('express');
const router = express.Router();

// Sample GET route for leave requests
router.get('/', (req, res) => {
  res.json([
    { id: 1, employee_id: 'E001', start_date: '2025-05-01', end_date: '2025-05-05', reason: 'Sick', status: 'approved' },
    { id: 2, employee_id: 'E002', start_date: '2025-05-10', end_date: '2025-05-12', reason: 'Vacation', status: 'pending' },
  ]);
});

// Add more routes as needed

module.exports = router;
