const sql = require('mssql');

const config = {
  user: 'sa',
  password: 'CorrectPass123!',
  server: 'localhost',
  database: 'attendance_db',
  port: 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

module.exports = { sql, config };
