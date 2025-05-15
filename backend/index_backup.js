const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors({
  origin: ['https://attendance-tracker-lac.vercel.app', 'https://attendance-tracker-1ssa3oykr-saibandi1234s-projects.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(bodyParser.json());

// ------------------- In-Memory Data -------------------
let leaveRequests = [];
let attendanceLogs = [];

// ------------------- API Routes -------------------

// Submit leave request
app.post('/api/leave_requests', (req, res) => {
  const { employee_id, start_date, end_date, reason, status } = req.body;
  if (!employee_id || !start_date || !end_date || !reason || !status) {
    return res.status(400).send('Missing required fields');
  }
  const newRequest = {
    leave_id: leaveRequests.length + 1,
    employee_id,
    start_date,
    end_date,
    reason,
    status
  };
  leaveRequests.push(newRequest);
  res.status(201).send('Leave request submitted');
});

// Get leave requests
app.get('/api/leave_requests', (req, res) => {
  res.json(leaveRequests);
});

// Update leave request status (manager)
app.put('/api/leave_requests/:id', (req, res) => {
  const leave_id = parseInt(req.params.id);
  const { status } = req.body;
  const index = leaveRequests.findIndex(req => req.leave_id === leave_id);
  if (index === -1) return res.status(404).send('Request not found');
  leaveRequests[index].status = status;
  res.send('Status updated');
});

// Submit attendance (clock-in/out)
app.post('/api/attendance', (req, res) => {
  const { employee_id, log_time, status } = req.body;
  if (!employee_id || !log_time || !status) {
    return res.status(400).send('Missing required fields');
  }
  const log = {
    log_id: attendanceLogs.length + 1,
    employee_id,
    log_time,
    status
  };
  attendanceLogs.push(log);
  res.status(201).send('Attendance logged');
});

// Get attendance logs
app.get('/api/attendance', (req, res) => {
  const emp_id = req.query.emp_id;
  if (!emp_id) return res.status(400).send('Missing emp_id');
  const logs = attendanceLogs.filter(log => log.employee_id == emp_id);
  res.json(logs);
});

// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅ In-memory server running on port ${port}`));
