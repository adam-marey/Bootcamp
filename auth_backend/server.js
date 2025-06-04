const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Admin routes
try {
  app.use('/api/admin', require('./routes/admin'));
} catch (err) {
  console.error('Failed to load admin routes:', err.message);
}

// User routes
try {
  app.use('/api/users', require('./routes/users'));
} catch (err) {
  console.error('Failed to load user routes:', err.message);
}

app.listen(5500, () => {
  console.log('Server running on port 5500');
});
