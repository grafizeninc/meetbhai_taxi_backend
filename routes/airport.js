const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const airportController = require("../controllers/airport");
const {storage} = require('../utils/fileUpload');
const multer = require('multer');
const upload = multer({storage: storage});
const uploadAirportFile = upload.single('airport');
const uploadDestinationFile = upload.single('destination');

// Protect all routes after this middleware
router.use(authController.protect);

router.get("/airports", airportController.getAll);
router.get("/airport/:id", airportController.getOne);

// Destination Routes
router.get("/available-airport", airportController.getAvailableAirportInDestination);
router.post("/available-airport", airportController.addAvailableAirportInDestination);
// router.post("/available-airport/:id", airportController.availbleAirportInDestination);
router.get("/destination/:airport", airportController.getDestinationByAirport);
router.get("/available-airports", airportController.getAvailbleAirportsInDestination);
router.post("/destination/edit/:id", airportController.updateDestination);
router.post("/destination/tags/:id", airportController.updateDestinationTags);

// Destination Vehicle
router.get("/destination-vehicle/:destination",airportController.getvehicleByDestination);
router.post("/destination", airportController.addDestination);
// router.post("/destination-vehicle/edit/:id",airportController.updateDestination);
router.get("/airport-destination-vehicle",airportController.getvehicleListByAirportDestination);
router.get("/all-destination", airportController.getAllDestination);


// Only admin have permission to access for the below APIs
// router.use(authController.restrictTo("admin"));

router.post("/airport/:id", airportController.update);
router.post("/airport", airportController.add);
router.delete("/airport/:id", airportController.delete);
router.post("/airport-bulk-upload", uploadAirportFile, airportController.handleAirportUpload);
router.post("/destination-bulk-upload", uploadDestinationFile, airportController.handleDestinationUpload);
router.get("/airport-download", airportController.downloadAirportFile);
router.get("/destination-download", airportController.downloadDestinationFile);

router.delete("/destination/:id", airportController.deleteDestination);

module.exports = router;
