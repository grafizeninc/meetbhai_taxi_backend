const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const stateAndCityController = require("../controllers/stateAndCity");

// Protect all routes after this middleware
router.use(authController.protect);

router.get("/states", stateAndCityController.getAllState);
router.get("/state/:id", stateAndCityController.getOneState);

router.get("/cities", stateAndCityController.getAllCity);
router.get("/city/:id", stateAndCityController.getOneCity);

// Only admin have permission to access for the below APIs
router.use(authController.restrictTo("admin"));

router.post("/state/:id", stateAndCityController.updateState);
router.post("/state", stateAndCityController.addState);
router.delete("/state/:id", stateAndCityController.deleteState);

router.post("/city/:id", stateAndCityController.updateCity);
router.post("/city", stateAndCityController.addCity);
router.delete("/city/:id", stateAndCityController.deleteCity);

module.exports = router;
