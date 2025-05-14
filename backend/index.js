const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// ✅ FIX: Enable CORS for your Vercel frontend
app.use(cors({
  origin: 'https://attendance-tracker-lac.vercel.app', // 👈 your Vercel frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// ✅ Middleware for JSON parsing
app.use(bodyParser.json());

// ✅ Temporary in-memory array (you may replace this with DB later)
let leaveRequests = [];

// ✅ POST - Submit a leave request
app.post('/api/leave_requests', (req, res) => {
  const { employee_id, start_date, end_date, reason, status } = req.body;

  if (!employee_id || !start_date || !end_date || !reason || !status) {
    return res.status(400).send('Missing required fields');
  }

  const newRequest = { employee_id, start_date, end_date, reason, status };
  leaveRequests.push(newRequest);
  res.status(201).send('Leave request submitted');
});

// ✅ GET - Get all leave requests
app.get('/api/leave_requests', (req, res) => {
  const requestsWithIds = leaveRequests.map((req, idx) => ({
    id: idx,
    ...req
  }));
  res.status(200).json(requestsWithIds);
});

// ✅ PUT - Manager updates status
app.put('/api/leave_requests/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).send('Invalid status');
  }

  if (!leaveRequests[id]) {
    return res.status(404).send('Request not found');
  }

  leaveRequests[id].status = status;
  res.status(200).send('Status updated');
});

// ✅ Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
