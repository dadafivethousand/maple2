const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const stripe = require('stripe')('6LfVmFoqAAAAAPd3gAfJAsZLhPQU46ilnkcuTkIa'); // Use your Stripe Secret Key
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const SECRET_KEY = '6LfVmFoqAAAAAPd3gAfJAsZLhPQU46ilnkcuTkIa'
const PORT = process.env.PORT || 5000;
const allowedOrigins = ['https://maplebjj.com', 'https://www.maplebjj.com'];
const server = http.createServer(app);

// Initialize socket.io on the server
const io = new Server(server);

app.use(bodyParser.json());

// Configure environment variables
dotenv.config();

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.use(express.json());  // Parse incoming JSON requests

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Serve static files from the React app's build folder
app.use(express.static(path.join(__dirname, '../build')));

// API Routes
app.use('/api/person', personRoutes); // Route all person-related requests
app.use('/api/payment', paymentRoutes);

app.post('/webhook/smartwaiver', (req, res) => {
  const waiverData = req.body; // This will contain the waiver details
  console.log("Waiver signed:", waiverData);

  // Emit an event to notify the frontend (using WebSocket, etc.)
  io.emit("waiverSigned", waiverData);

  res.status(200).send('Webhook received');
});


app.post('/verify-captcha', async (req, res) => {
  const { captchaValue } = req.body;  // This is the token from the front-end

  if (!captchaValue) {
      return res.status(400).json({ success: false, message: 'Please complete the CAPTCHA.' });
  }

  const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${captchaValue}`;

  try {
      const response = await axios.post(verificationURL);
      const { success } = response.data;

      if (success) {
          return res.json({ success: true, message: 'CAPTCHA verification successful!' });
      } else {
          return res.status(400).json({ success: false, message: 'CAPTCHA verification failed.' });
      }
  } catch (error) {
      console.error('Error verifying CAPTCHA:', error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});


// Catch-all for serving the React app on any route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../build/index.html'));
});

// Start the server only once
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
