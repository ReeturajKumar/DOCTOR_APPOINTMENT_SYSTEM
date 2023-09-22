const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  getAllUsersController,
  changeAccountStatusCOntroller,
  getAllDoctoreController,
} = require('../controllers/adminCtrl');

// GET USERS
router.get('/getAllUsers', authMiddleware, getAllUsersController);

// GET DOCTORS
router.get('/getAllDoctors', authMiddleware, getAllDoctoreController);

// ACCOUNT CHANGE STATUS (POST)
router.post('/changeAccountStatus', authMiddleware, changeAccountStatusCOntroller);


module.exports = router;
