const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('./../controllers/authController');


router.post('/login', authController.login);
router.post('/signup', authController.signup);


router.post('/admin/login', authController.adminLogin);
router.post('/admin/signup', authController.adminSignup);

// Protect all routes after this middleware
router.use(authController.protect);

// Only admin have permission to access for the below APIs 
router.use(authController.restrictTo('admin'));

module.exports = router;