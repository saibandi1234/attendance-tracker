const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// ✅ Enable CORS with custom settings for Vercel frontend
app.use(cors({
  origin: 'https://attendance-tracker-lac.vercel.app', // Replace with actual deployed Vercel URL
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(bodyParser.json());

// Simulated DB
let leaveRequests = [];

// POST - Submit leave request
app.post('/api/leave_requests', (req, res) => {
  const { employee_id, start_date, end_date, reason, status } = req.body;

  if (!employee_id || !start_date || !end_date || !reason || !status) {
    return res.status(400).send('Missing required fields');
  }

  const newRequest = { employee_id, start_date, end_date, reason, status };
  leaveRequests.push(newRequest);

  res.status(201).send('Leave request submitted');
});

// GET - Retrieve all leave requests (with ID for each)
app.get('/api/leave_requests', (req, res) => {
  const requestsWithIds = leaveRequests.map((request, index) => ({
    id: index,
    ...request
  }));
  res.status(200).json(requestsWithIds);
});

// PUT - Approve or Reject a leave request
app.put('/api/leave_requests/:id', (req, res) => {
  const requestId = parseInt(req.params.id);
  const { status } = req.body;

  if (!status || !['approved', 'rejected'].includes(status)) {
    return res.status(400).send('Invalid status');
  }

  if (!leaveRequests[requestId]) {
    return res.status(404).send('Leave request not found');
  }

  leaveRequests[requestId].status = status;
  res.status(200).send('Leave request status updated');
});


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
