const express = require('express');
const router = express.Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');
const verifyAdmin = require('../middleware/verifyAdmin');

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = '1234'; // You can hash this later
const JWT_SECRET = 'supersecret';

// Admin login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '2h' });
    return res.json({ token });
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
});

// Add an approved email
router.post('/approve', verifyAdmin, async (req, res) => {
  const { email } = req.body;
  try {
    await pool.query('INSERT INTO approved_emails (email) VALUES ($1)', [
      email
    ]);
    res.status(201).json({ message: 'Email approved' });
  } catch (err) {
    if (err.code === '23505') {
      res.status(409).json({ message: 'Email already approved' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
});

// Get all approved emails
router.get('/approved', verifyAdmin, async (req, res) => {
  const result = await pool.query('SELECT * FROM approved_emails');
  res.json(result.rows);
});

router.get('/users', verifyAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, email FROM users ORDER BY id ASC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/approved', verifyAdmin, async (req, res) => {
  try {
    const result = await db.query('SELECT email FROM approved_users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch approved users' });
  }
});
// DELETE approved email (unapprove user)
router.delete('/approved/:email', async (req, res) => {
  const { email } = req.params;

  await pool.query('DELETE FROM approved_emails WHERE email = $1', [email]);
  await pool.query('DELETE FROM users WHERE email = $1', [email]);

  res.json({ message: 'User approval and account removed' });
});

module.exports = router;
