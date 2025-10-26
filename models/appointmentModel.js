const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  phone_number: { type: String, required: true },
  clinic: { type: String, required: true },
  date: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
