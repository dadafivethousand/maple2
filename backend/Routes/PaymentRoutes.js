const express = require('express');
const paymentController = require('../controllers/PaymentController');
const router = express.Router();

// Route for creating a PaymentIntent
router.post('/create-payment-intent', PaymentController.createPaymentIntent);

module.exports = router;
