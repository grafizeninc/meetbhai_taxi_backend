const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const tripController = require("../controllers/trip");
const {storage} = require('../utils/fileUpload');
const multer = require('multer');
const upload = multer({storage: storage});
const uploadImage = upload.single('trip');
const uploadFile = upload.single('trips');
// const uploadImages = upload.fields([
//     { name: 'trip', maxCount: 1 }
// ])


// Protect all routes after this middleware
router.use(authController.protect);

router.get("/trips", tripController.getAll);
router.get("/trip/:id", tripController.getOne);

// Only admin have permission to access for the below APIs
// router.use(authController.restrictTo("admin"));

router.post("/trip/:id", tripController.update);
router.post("/trip", uploadImage,tripController.add);
router.delete("/trip/:id", tripController.delete);
router.post("/trip-bulk-upload", uploadFile, tripController.handleTripUpload);
router.get("/trip-download",  tripController.downloadTripFile);


module.exports = router;
