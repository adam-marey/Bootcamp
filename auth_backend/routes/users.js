const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'supersecret'; // Use .env in real apps

// ✅ Register user (only if pre-approved)
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  // 1. Check approved
  const approved = await pool.query(
    'SELECT * FROM approved_emails WHERE email = $1',
    [email]
  );
  if (approved.rows.length === 0) {
    return res
      .status(403)
      .json({ message: 'Email not approved for registration' });
  }

  // 2. Check if already registered
  const existing = await pool.query('SELECT * FROM users WHERE email = $1', [
    email
  ]);
  if (existing.rows.length > 0) {
    return res.status(400).json({ message: 'Email already registered' });
  }

  // 3. Hash password & save
  const hashed = await bcrypt.hash(password, 10);
  await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [
    email,
    hashed
  ]);
  res.status(201).json({ message: 'User registered' });
});

// ✅ Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await pool.query('SELECT * FROM users WHERE email = $1', [
    email
  ]);
  if (user.rows.length === 0) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const match = await bcrypt.compare(password, user.rows[0].password);
  if (!match) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ role: 'user', id: user.rows[0].id }, JWT_SECRET, {
    expiresIn: '1h'
  });
  res.json({ token });
});

module.exports = router;
