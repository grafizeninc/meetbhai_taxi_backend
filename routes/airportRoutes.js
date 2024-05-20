const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const airportController = require('./../controllers/airportController');


router.get('/airports', airportController.getAll);
router.get('/airport/:id', airportController.getOne);
router.post('/airport/:id', airportController.update);
router.post('/airport', airportController.add);

// Protect all routes after this middleware
router.use(authController.protect);

// Only admin have permission to access for the below APIs 
router.use(authController.restrictTo('admin'));

module.exports = router;