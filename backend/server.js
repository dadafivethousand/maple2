const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const personRoutes = require('./Routes/PersonRoutes'); // Import routes
const path = require('path');

// Initialize Express app
const app = express();

// Configure environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'https://maplebjj.com' }));
app.use(express.json());  // Parse incoming JSON requests

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Serve static files from the React app's build folder
app.use(express.static(path.join(__dirname, 'build')));

// API Routes
app.use('/api/person', personRoutes); // Route all person-related requests

// Catch-all for serving the React app on any route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

// Start the server only once
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
