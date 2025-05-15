const { sql, config } = require('./db');

async function testConnection() {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT GETDATE() AS current_time`;
    console.log('✅ Connection successful. Current SQL Server time:', result.recordset[0].current_time);
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
  } finally {
    await sql.close();
  }
}

testConnection();
