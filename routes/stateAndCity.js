const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const stateAndCityController = require("../controllers/stateAndCity");
const {storage} = require('../utils/fileUpload');
const multer = require('multer');
const upload = multer({storage: storage});
const stateImage = upload.single('state');
const cityImage = upload.single('city');

// Protect all routes after this middleware
router.use(authController.protect);

router.get("/states", stateAndCityController.getAllState);
router.get("/state/:id", stateAndCityController.getOneState);

router.get("/cities", stateAndCityController.getAllCity);
router.get("/city/:id", stateAndCityController.getOneCity);

// Only admin have permission to access for the below APIs
// router.use(authController.restrictTo("admin"));

router.post("/state/:id", stateAndCityController.updateState);
router.post("/state", stateAndCityController.addState);
router.delete("/state/:id", stateAndCityController.deleteState);
router.post("/state-bulk-upload", stateImage, stateAndCityController.handleStateUpload);
router.post("/city-bulk-upload", cityImage, stateAndCityController.handleCityUpload);
router.get("/state-download", stateAndCityController.downloadStateFile);


router.post("/city/:id", stateAndCityController.updateCity);
router.post("/city", stateAndCityController.addCity);
router.delete("/city/:id", stateAndCityController.deleteCity);

module.exports = router;
