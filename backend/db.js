// db.js
const sql = require('mssql');

const config = {
  user: 'SA',
  password: 'YourStrong!Passw0rd',
  server: '20.83.176.127',  // Your VM's public IP
  database: 'attendance_db',
  port: 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

module.exports = { sql, config };
