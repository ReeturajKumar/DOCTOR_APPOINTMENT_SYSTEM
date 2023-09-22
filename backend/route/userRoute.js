const express = require('express');
const { 
    loginController, 
    registerController, 
    authController,
    applyDoctorController,
    getAllNotificationController,
    deleteAllNotificationController,
    getAllDoctorsController,
    // bookingAvaibilityController,
    userAppoitmentsController,
    // docterController,
    bookAppointmentController,
 } 
 = 
 require
 ('../controllers/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');

// Create a router object
const router = express.Router();

// Define routes
// LOGIN || POST
router.post('/login', loginController);

// REGISTER || POST
router.post('/register', registerController);


// USER MIDDLEWARES  || POST
router.post('/getUserData', authMiddleware, authController);


// APPLY DOCTOR  || POST
router.post('/apply-doctor', authMiddleware, applyDoctorController);

//DOCTOR UNREAD NOTIFICATION || POST
router.post('/get-all-notification', authMiddleware, getAllNotificationController);


//DOCTOR READ NOTIFICATION || POST
router.post('/delete-all-notification', authMiddleware, deleteAllNotificationController);


// GET ALL DOCTOR 
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController)


//BOOK APPOITMENTS 
router.post('/book-appointment', authMiddleware, bookAppointmentController)

// //BOOKING AVAILABILITY
// router.post('/booking-avaibility', authMiddleware, bookingAvaibilityController)

//Appoitment List 
router.get('/user-appointments', authMiddleware, userAppoitmentsController)

module.exports = router;
