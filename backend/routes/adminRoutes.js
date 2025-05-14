const express = require('express');
const router = express.Router();
const leaveRequests = require('../data/leaveRequests');
const employees = require('../data/employees');

// GET /api/admin/summary
router.get('/summary', (req, res) => {
  const total = leaveRequests.length;
  const approved = leaveRequests.filter(r => r.status === 'approved').length;
  const rejected = leaveRequests.filter(r => r.status === 'rejected').length;
  const pending = leaveRequests.filter(r => r.status === 'pending').length;

  res.json({ total, approved, rejected, pending });
});

// GET /api/admin/employees
router.get('/employees', (req, res) => {
  res.json(employees);
});

module.exports = router;
