const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

// Simulate an array to store leave requests (or connect to a DB)
let leaveRequests = [];

// POST endpoint to handle new leave requests
app.post('/api/leave_requests', (req, res) => {
  const { employee_id, start_date, end_date, reason, status } = req.body;

  if (!employee_id || !start_date || !end_date || !reason || !status) {
    return res.status(400).send('Missing required fields');
  }

  const newRequest = { employee_id, start_date, end_date, reason, status };
  leaveRequests.push(newRequest);

  res.status(201).send('Leave request submitted');
});

// GET endpoint to retrieve all leave requests
app.get('/api/leave_requests', (req, res) => {
  res.status(200).json(leaveRequests); // Return all leave requests
});

// Server setup to listen on the specified port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

