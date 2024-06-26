const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const localPackageController = require('./../controllers/localPackageController');



// Protect all routes after this middleware
router.use(authController.protect);

router.get('/localHourlyPackages', localPackageController.getAll);
router.get('/localHourlyPackage/:id', localPackageController.getOne);


// Only admin have permission to access for the below APIs 
router.use(authController.restrictTo('admin'));

router.post('/localHourlyPackage/:id', localPackageController.update);
router.post('/localHourlyPackage', localPackageController.add);
router.delete('/localHourlyPackage/:id', localPackageController.delete);


module.exports = router;