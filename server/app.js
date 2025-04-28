const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const entryRoutes = require('./routes/entryRoutes');


const app = express();

const allowedOrigins = [
  "http://localhost:5173",    
  "https://echo-verse-five.vercel.app",
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true, 
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/entries', entryRoutes);

// Home Route (temporary to check server)
app.get('/', (req, res) => {
  res.send('EchoVerse API is running...');
});

module.exports = app;