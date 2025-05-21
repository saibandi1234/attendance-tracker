const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// ✅ Enable CORS for Vercel frontend & localhost
app.use(cors({
  origin: (origin, callback) => {
    if (
      !origin ||
      origin === 'http://localhost:3000' ||
      origin === 'https://attendance-tracker-lac.vercel.app' ||
      /\.vercel\.app$/.test(origin)
    ) {
      callback(null, true);
    } else {
      console.log(`❌ BLOCKED ORIGIN: ${origin}`);
      callback(new Error('CORS not allowed'));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(bodyParser.json());

// ------------------- In-Memory Data -------------------
let leaveRequests = [];
let attendanceLogs = [];
let employees = [
  { id: 111, name: 'Employee One', role: 'employee' },
  { id: 222, name: 'Manager One', role: 'manager' },
  { id: 999, name: 'Admin One', role: 'admin' }
];

// ------------------- Leave Request APIs -------------------
app.post('/api/leave_requests', (req, res) => {
  const { leave_id, employee_id, start_date, end_date, reason, status } = req.body;
  if (!leave_id || !employee_id || !start_date || !end_date || !reason || !status) {
    return res.status(400).send('Missing required fields');
  }
  const newRequest = { leave_id, employee_id, start_date, end_date, reason, status };
  leaveRequests.push(newRequest);
  res.status(201).json(newRequest);
});

app.get('/api/leave_requests', (req, res) => {
  res.json(leaveRequests);
});

app.put('/api/leave_requests/:id', (req, res) => {
  const leave_id = parseInt(req.params.id);
  const { status } = req.body;
  const index = leaveRequests.findIndex(req => req.leave_id === leave_id);
  if (index === -1) return res.status(404).send('Request not found');
  leaveRequests[index].status = status;
  res.send('Status updated');
});

// ------------------- Attendance APIs -------------------
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

app.get('/api/attendance', (req, res) => {
  const emp_id = req.query.emp_id;
  if (!emp_id) return res.status(400).send('Missing emp_id');
  const logs = attendanceLogs.filter(log => log.employee_id == emp_id);
  res.json(logs);
});

// ------------------- Admin APIs -------------------
app.get('/api/admin/summary', (req, res) => {
  const totalEmployees = employees.length;
  const totalLeaveRequests = leaveRequests.length;
  const approvedLeaves = leaveRequests.filter(r => r.status === 'approved').length;
  const pendingLeaves = leaveRequests.filter(r => r.status === 'pending').length;
  const rejectedLeaves = leaveRequests.filter(r => r.status === 'rejected').length;

  res.json({
    totalEmployees,
    totalLeaveRequests,
    approvedLeaves,
    pendingLeaves,
    rejectedLeaves
  });
});

app.get('/api/admin/employees', (req, res) => {
  res.json(employees);
});

// ------------------- Start Server -------------------
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`✅ Server running on port ${port}`));
