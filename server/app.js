const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes (we will add later)
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/entries', require('./routes/entryRoutes'));

// Home Route (temporary to check server)
app.get('/', (req, res) => {
  res.send('EchoVerse API is running...');
});

module.exports = app;