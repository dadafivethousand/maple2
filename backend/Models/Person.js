const mongoose = require('mongoose');

// Person Schema
const personSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },  // Optional
  streetAddress: { type: String,  },
  postalCode: { type: String,   },
  province: { type: String, default: 'ON' },  // Default to "ON"
  city: { type: String, default: 'Vaughan' },  // Default to "Vaughan"
  isMember: { type: Boolean, default: false }  // Member or not
});

const Person = mongoose.model('Person', personSchema);
module.exports = Person;
