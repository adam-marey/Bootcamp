// create_users_table.js
const pool = require('./db');

async function setup() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
    `);
    console.log('✅ users table created');
  } catch (err) {
    console.error('Error creating users table:', err.message);
  } finally {
    pool.end();
  }
}

setup();
