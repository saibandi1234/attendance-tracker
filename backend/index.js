const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sql, config } = require('./db'); // ✅ SQL Server config

const app = express();

// ✅ Enable CORS for Vercel frontend
app.use(cors({
  origin: 'https://attendance-tracker-lac.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(bodyParser.json());

// ✅ POST - Submit leave request to SQL Server
app.post('/api/leave_requests', async (req, res) => {
  const { employee_id, start_date, end_date, reason, status } = req.body;

  if (!employee_id || !start_date || !end_date || !reason || !status) {
    return res.status(400).send('Missing required fields');
  }

  try {
    await sql.connect(config);
    await sql.query`
      INSERT INTO leave_requests (employee_id, start_date, end_date, reason, status)
      VALUES (${employee_id}, ${start_date}, ${end_date}, ${reason}, ${status});
    `;
    res.status(201).send('Leave request submitted');
  } catch (err) {
    console.error('DB Insert Error:', err);
    res.status(500).send('Server error');
  }
});

// ✅ GET - Retrieve all leave requests from SQL Server
app.get('/api/leave_requests', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM leave_requests`;
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('DB Select Error:', err);
    res.status(500).send('Server error');
  }
});

// 🔁 PUT route (still using in-memory logic if needed for now)
let leaveRequests = []; // ⚠️ Remove this once PUT is converted to SQL

app.put('/api/leave_requests/:id', async (req, res) => {
  const leave_id = parseInt(req.params.id);
  const { status } = req.body;

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).send('Invalid status');
  }

  try {
    await sql.connect(config);
    const result = await sql.query`
      UPDATE leave_requests
      SET status = ${status}
      WHERE leave_id = ${leave_id};
    `;

    if (result.rowsAffected[0] === 0) {
      return res.status(404).send('Leave request not found');
    }

    res.status(200).send('Status updated');
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).send('Server error');
  }
});

// ✅ Admin routes
const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);

// ✅ Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
