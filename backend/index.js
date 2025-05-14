const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Simple endpoint
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Your leave request routes here (adjust if needed)
app.use('/api/leave_requests', require('./routes/leaveRoutes')); // If you have routes

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
