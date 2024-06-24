const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const airportController = require("../controllers/airport");
const {storage} = require('../utils/fileUpload');
const multer = require('multer');
const upload = multer({storage: storage});
const uploadImage = upload.single('airport');

// Protect all routes after this middleware
router.use(authController.protect);

router.get("/airports", airportController.getAll);
router.get("/airport/:id", airportController.getOne);

// Destination Routes
router.get("/destination", airportController.getDestination);
router.post("/destination", airportController.addDestination);
router.get("/destination/:airport", airportController.getDestinationByAirport);
router.get("/destination-airports", airportController.getDestinationAirports);
router.post("/destination/edit/:id", airportController.updateDestination);
router.post("/destination/tags/:id", airportController.updateDestinationTags);

// Destination Vehicle
router.get("/destination-vehicle/:destination",airportController.getvehicleByDestination);
router.post("/destination-vehicle", airportController.addDestinationVehicle);
router.post("/destination-vehicle/edit/:id",airportController.updateDestination);
router.get("/airport-destination-vehicle",airportController.getvehicleListByAirportDestination);
router.get("/all-destination-vehicle", airportController.getAllDestinationVehicle);


// Only admin have permission to access for the below APIs
// router.use(authController.restrictTo("admin"));

router.post("/airport/:id", airportController.update);
router.post("/airport", airportController.add);
router.delete("/airport/:id", airportController.delete);
router.post("/airport-bulk-upload", uploadImage, airportController.handleAirportUpload);

router.delete("/destination-vehicle/:id", airportController.deleteDestinationVehicle);

module.exports = router;
