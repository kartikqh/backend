const Appointment = require('../models/appointment');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken')
const userController = {
    addAppointment: async(req, res)=>{
        try {
            const { date, time } = req.body;
            const existingAppointment = await Appointment.findOne({ date, time });
            if (existingAppointment) {
              return res.status(400).json({ error: 'Appointment slot already exists' });
            }
            const newAppointment = new Appointment({ date, time, isTimeSlotAvailable: true });
            await newAppointment.save();
            res.status(201).json(newAppointment);
          } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
          }
    }
};

module.exports = userController;
