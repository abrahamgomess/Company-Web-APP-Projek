require('dotenv').config();
const mysql = require('mysql2/promise');

let pool = null;

async function getConnection() {
  if (pool) return pool;

  pool = await mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
  });

  return pool;
}

// Helper query yang dipakai routes/auth.js
async function queryUserByUsername(username) {
  const conn = await getConnection();
  const [rows] = await conn.query(
    'SELECT * FROM users WHERE username = ?',
    [username]
  );
  return rows[0];
}

module.exports = { getConnection, queryUserByUsername };
