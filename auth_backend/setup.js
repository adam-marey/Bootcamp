// Add this inside your setup.js or run manually
const pool = require('./db');
async function createUserTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `);
  console.log('✅ users table created');
  pool.end();
}

createUserTable();
