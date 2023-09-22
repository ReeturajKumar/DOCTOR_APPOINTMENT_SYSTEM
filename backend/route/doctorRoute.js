const express = require('express')
const authmiddleware = require('../middlewares/authMiddleware')
const { getDoctorInfoController, updateProfileController, getDoctorByIdController, doctorAppointmentsController, updateStatusController,} = require('../controllers/doctorCtrl');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

//POST SINGLE DOC INFO
router.post('/getDoctorInfo', authmiddleware, getDoctorInfoController)

//POST UPDATE PROFILE
router.post('/updateProfile', authmiddleware, updateProfileController)

//POST SINGLE DOC INFO
router.post('/getDoctorById', authmiddleware, getDoctorByIdController)

//GET Appointments 
router.get('/doctor-appointments', authmiddleware, doctorAppointmentsController)

// updating status 
router.post('/update-status', authmiddleware, updateStatusController)
module.exports = router