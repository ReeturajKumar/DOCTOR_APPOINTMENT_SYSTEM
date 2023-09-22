const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  getAllUsersController,
  changeAccountStatusCOntroller,
  makeadminController,
} = require('../controllers/adminCtrl');

// GET USERS
router.get('/getAllUsers', authMiddleware, getAllUsersController);

// ACCOUNT CHANGE STATUS (POST)
router.post('/makeadmin', authMiddleware, makeadminCOntroller);


module.exports = router;
