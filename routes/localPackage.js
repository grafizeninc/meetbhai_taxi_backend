const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const localPackageController = require("../controllers/localPackage");

// Protect all routes after this middleware
router.use(authController.protect);

router.get("/localHourlyPackages", localPackageController.getAll);
router.get("/localHourlyPackages/:id", localPackageController.getOne);
router.get("/localHourlyPackage/:city", localPackageController.getPackagesByCity);

// Only admin have permission to access for the below APIs
// router.use(authController.restrictTo("admin"));

router.post("/localHourlyPackage/:id", localPackageController.update);
router.post("/localHourlyPackage", localPackageController.add);
router.delete("/localHourlyPackage/:id", localPackageController.delete);

router.get("/local-airport-vehicles", localPackageController.getVehicleListByLocalAirportPackage);

module.exports = router;
