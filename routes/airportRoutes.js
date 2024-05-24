const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const airportController = require('./../controllers/airportController');



// Protect all routes after this middleware
router.use(authController.protect);

router.get('/airports', airportController.getAll);
router.get('/airport/:id', airportController.getOne);

// Destination Routes
router.get('/destination', airportController.getDestination);
router.post('/destination', airportController.addDestination);
router.post('/destination', airportController.addLandMark);
router.get('/destination/:airport', airportController.getDestinationByAirport);
router.post('/destination/edit/:id', airportController.updateDestination);
router.post('/destination/tags/:id', airportController.updateDestinationTags);


// Only admin have permission to access for the below APIs 
router.use(authController.restrictTo('admin'));

router.post('/airport/:id', airportController.update);
router.post('/airport', airportController.add);
router.delete('/airport/:id', airportController.delete);


module.exports = router;