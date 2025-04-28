const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const entryRoutes = require('./routes/entryRoutes');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/entries', entryRoutes);

// Home Route (temporary to check server)
app.get('/', (req, res) => {
  res.send('EchoVerse API is running...');
});

module.exports = app;