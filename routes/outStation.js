const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const outStationController = require('../controllers/outStation');

// Protect all routes after this middleware
router.use(authController.protect);

router.get('/out-stations', outStationController.getAll);
router.get('/out-station/:id', outStationController.getOne);


// Only admin have permission to access for the below APIs
router.use(authController.restrictTo('admin'));

router.put('/out-station/edit/:id', outStationController.update);
router.post('/out-station/add', outStationController.add);
router.delete('/out-station/delete/:id', outStationController.delete);


module.exports = router;