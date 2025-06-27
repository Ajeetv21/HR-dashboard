const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-frontend.vercel.app'],
  credentials: true,
}));

// Static files
app.use('/files', express.static(path.join(__dirname, 'files')));
app.use(express.static('uploads'));

// Routes
app.use('/api/v1', require('./routes/attendanceRoute'));
app.use('/api/v1', require('./routes/candidateRoute'));
app.use('/api/v1', require('./routes/EmployeeRoute'));
app.use('/api/v1', require('./routes/authRoute'));
app.use('/api/v1', require('./routes/profileRoute'));
app.use('/api/v1', require('./routes/leaveRoute'));

// Test route
app.get('/', (req, res) => {
  res.send('Hello from Express on Vercel!');
});

module.exports = app; // Don't call app.listen here
