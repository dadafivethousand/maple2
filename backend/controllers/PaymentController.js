const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Use Stripe Secret Key from env

// Controller logic for creating a PaymentIntent
exports.createPaymentIntent = async (req, res) => {
  const { amount, currency } = req.body; // Get the amount and currency from the request

  try {
    // Create a PaymentIntent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: currency,
      payment_method_types: ['card'], // Only accepting card payments
    });

    // Send the clientSecret to the front-end
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: error.message });
  }
};
