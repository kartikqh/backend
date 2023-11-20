const express = require('express');
const appointmentController = require('../controllers/appointmentController');
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const commonAuth = require('../middleware/commonAuth')
const router = express.Router();

router.post('/add/appointment', authAdmin,appointmentController.addAppointment);



module.exports = router;
