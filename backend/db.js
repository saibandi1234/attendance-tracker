// db.js
const sql = require('mssql');

const config = {
  user: 'SA',
  password: 'YourStrong!Passw0rd',
  server: 'localhost',
  database: 'attendance_db',
  port: 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

module.exports = { sql, config };
