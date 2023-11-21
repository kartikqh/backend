const mongoose = require('mongoose');

// Appointment Schema
const appointmentSchema = new mongoose.Schema({
    id: String,
    date: String,
    time: String,
    isTimeSlotAvailable: Boolean,
    isAdded:Boolean

  });
  const Appointment = mongoose.model('Appointment', appointmentSchema);
