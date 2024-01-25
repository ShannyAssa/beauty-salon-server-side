const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  customer: {
    id: { type: String, ref: 'Customer', required: true },
    username: { type: String, required: true },
  },
  treatment: {
    name: { type: String, required: true },
    durationMinutes: { type: Number }, 
  },
  approvedByAdmin: { type: Boolean},
  notes: { type: String }
});

module.exports = mongoose.model('Appointment', appointmentSchema);

