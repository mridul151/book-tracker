const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const routes = require('./routes');

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();

// Connect to the database
connectDB();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});