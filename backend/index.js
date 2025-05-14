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
    console.error('DB Insert Error:', err.message);         // log error message to terminal
    res.status(500).json({ error: err.message });           // send error to frontend as JSON
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

// ✅ POST - Log attendance entry to SQL Server
app.post('/api/attendance', async (req, res) => {
  const { employee_id, log_time, status } = req.body;

  if (!employee_id || !log_time || !status) {
    return res.status(400).send('Missing required fields');
  }

  try {
    await sql.connect(config);
    await sql.query`
      INSERT INTO attendance_logs (employee_id, log_time, status)
      VALUES (${employee_id}, ${log_time}, ${status});
    `;
    res.status(201).send('Attendance logged');
  } catch (err) {
    console.error('Insert error:', err);
    res.status(500).send('Server error');
  }
});

// ✅ GET - Fetch attendance logs by employee ID
app.get('/api/attendance', async (req, res) => {
  const emp_id = req.query.emp_id;

  if (!emp_id) return res.status(400).send('Missing emp_id');

  try {
    await sql.connect(config);
    const result = await sql.query`
      SELECT * FROM attendance_logs
      WHERE employee_id = ${emp_id}
      ORDER BY log_time DESC;
    `;
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('Select error:', err);
    res.status(500).send('Server error');
  }
});

// ✅ Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
