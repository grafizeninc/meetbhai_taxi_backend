const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const vehicleController = require('./../controllers/vehicleController');




// Protect all routes after this middleware
router.use(authController.protect);

router.get('/vehicles', vehicleController.getAll);
router.get('/vehicle/:id', vehicleController.getOne);

router.get('/vehicle-models', vehicleController.getModelAll);
router.get('/vehicle-model/:id', vehicleController.getModelOne);


// Only admin have permission to access for the below APIs 
router.use(authController.restrictTo('admin'));

router.post('/vehicle/:id', vehicleController.update);
router.post('/vehicle', vehicleController.add);
router.delete('/vehicle/:id', vehicleController.delete);

router.post('/vehicle-model/:id', vehicleController.updateModel);
router.post('/vehicle-model', vehicleController.addModel);
router.delete('/vehicle-model/:id', vehicleController.deleteModel);


module.exports = router;