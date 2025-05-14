const sql = require('mssql');

const config = {
  user: 'sa',
  password: 'MySecretPassw0rd!', // your verified SA password
  server: '20.83.176.127',       // your VM public IP
  database: 'attendance_db',
  port: 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

module.exports = { sql, config }; // ✅ export both
