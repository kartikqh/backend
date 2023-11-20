const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const commonAuth = require('../middleware/commonAuth')
const router = express.Router();

router.post('/signUp', userController.signUp);
router.post('/login', userController.login);
router.get('/driver', commonAuth, userController.getDriverByID);
router.put('/driver', auth,userController.updateDriver);


module.exports = router;
