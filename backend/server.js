const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const personRoutes = require('./routes/PersonRoutes'); // Import routes

// Initialize environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());  // Parse incoming JSON requests

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Use routes
app.use('/api/person', personRoutes); // Route all person-related requests

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
