const mongoose = require('mongoose');

// Appointment Schema
const appointmentSchema = new mongoose.Schema({
    date: String,
    time: String,
    isTimeSlotAvailable: Boolean,
  });
  const Appointment = mongoose.model('Appointment', appointmentSchema);
