const express = require('express');
const connectDB = require('./utils/db');
const dotenv = require('dotenv');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use('/admin', adminRoutes); // Admin routes
app.use('/user', userRoutes); // User routes

app.use('/uploads', express.static('uploads')); // Serve static files from uploads directory

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});