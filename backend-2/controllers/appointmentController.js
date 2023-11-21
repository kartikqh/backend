const Appointment = require('../models/appointment');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken')
const userController = {
    addAppointment: async(req, res)=>{
        try {
            const { date, time } = req.body;
            const existingAppointment = await Appointment.findOne({ date, time });
            if (existingAppointment.isAdded) {
              return res.status(400).json({ error: 'Appointment slot already exists' });
            }
            const newAppointment = await Appointment.update({ date, time},{$set:{ isTimeSlotAvailable: true , isAdded: true}});
            res.status(201).json(newAppointment);
          } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
          }
    },

    getAvailiableSlots: async(req, res)=>{
        try{
            const selectedDate = req.body.selectedDate;
            const existingAppointment = await Appointment.find({ date});
            if (existingAppointment) {
                return res.status(200).json(existingAppointment);
              }
                const appointment= [{
                    id: '1',
                    date: selectedDate,
                    time: '09:00',
                    isTimeAvailable: false,
                    isAdded: false
                },{
                    id: '2',
                    date: selectedDate,
                    time: '09:30',
                    isTimeAvailable: false,
                    isAdded: false
                },{
                    id: '3',
                    time: '10:00',
                    date: selectedDate,
                    isTimeAvailable: false,
                    isAdded: false
                },{
                    id: '4',
                    time: '10:30',
                    date: selectedDate,
                    isTimeAvailable: false,
                    isAdded: false
                },{
                    id: '5',
                    time: '11:00',
                    date: selectedDate,
                    isTimeAvailable: false,
                    isAdded: false
                },
                {
                    id: '6',
                    time: '11:30',
                    date: selectedDate,
                    isTimeAvailable: false,
                    isAdded: false
                },{
                    id: '7',
                    time: '12:00',
                    date: selectedDate,
                    isTimeAvailable: false,
                    isAdded: false
                },{
                    id: '8',
                    time: '12:30',
                    date: selectedDate,
                    isTimeAvailable: false,
                    isAdded: false
                },{
                    id: '9',
                    time: '01:00',
                    date: selectedDate,
                    isTimeAvailable: false,
                    isAdded: false
                },{
                    id: '10',
                    time: '01:30',
                    date: selectedDate,
                    isTimeAvailable: false,
                    isAdded: false
                },
                {
                    id: '11',
                    time: '02:00',
                    date: selectedDate,
                    isTimeAvailable: false,
                    isAdded: false
                },]
                await Appointment.insertMany(appointment)
                return res.status(200).json(appointment);

        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
          }
    },
    };

module.exports = userController;
