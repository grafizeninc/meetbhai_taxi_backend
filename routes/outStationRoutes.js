const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const outStationController = require('./../controllers/outStationController');

// Protect all routes after this middleware
router.use(authController.protect);

router.get('/', outStationController.getAll);
router.get('/out-station/:id', outStationController.getOne);


// Only admin have permission to access for the below APIs 
router.use(authController.restrictTo('admin'));

router.post('/out-station/:id', outStationController.update);
router.post('/out-station/add', outStationController.add);
router.delete('/out-station/:id', outStationController.delete);


module.exports = router;