const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const airportController = require('./../controllers/airportController');



// Protect all routes after this middleware
router.use(authController.protect);

router.get('/airports', airportController.getAll);
router.get('/airport/:id', airportController.getOne);


// Only admin have permission to access for the below APIs 
router.use(authController.restrictTo('admin'));

router.post('/airport/:id', airportController.update);
router.post('/airport', airportController.add);
router.delete('/airport/:id', airportController.delete);


module.exports = router;