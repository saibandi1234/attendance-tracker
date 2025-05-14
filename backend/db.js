const sql = require('mssql');

const config = {
  user: 'sa',
  password: 'StrongPassw0rd123!',
  server: '20.83.176.127',
  database: 'attendance_db',
  port: 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

module.exports = { sql, config };
