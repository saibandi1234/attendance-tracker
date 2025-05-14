const express = require('express');
const router = express.Router();

// Simulate leave requests
let leaveRequests = [];

router.post('/leave_requests', (req, res) => {
  const { employee_id, start_date, end_date, reason, status } = req.body;

  if (!employee_id || !start_date || !end_date || !reason || !status) {
    return res.status(400).send('Missing required fields');
  }

  const newRequest = { employee_id, start_date, end_date, reason, status };
  leaveRequests.push(newRequest);

  res.status(201).send('Leave request submitted');
});

router.get('/leave_requests', (req, res) => {
  res.status(200).json(leaveRequests); // Return all leave requests
});

module.exports = router;
