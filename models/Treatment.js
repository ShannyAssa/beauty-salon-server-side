const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  images: { type: [String] }, 
  price: { type: Number, required: true },
  numberOfAppointments: { type: Number, default: 1 }, 
  durationMinutes: { type: Number }, 
});

module.exports = mongoose.model('Treatment', treatmentSchema);
