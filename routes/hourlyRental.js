const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const hourlyRentalController = require("../controllers/hourlyRental");

// Protect all routes after this middleware
router.use(authController.protect);

router.get("/hourlyRentals", hourlyRentalController.getAll);
router.get("/hourlyRental/:id", hourlyRentalController.getOne);

// Only admin have permission to access for the below APIs
router.use(authController.restrictTo("admin"));

router.post("/hourlyRental/:id", hourlyRentalController.update);
router.post("/hourlyRental", hourlyRentalController.add);
router.delete("/hourlyRental/:id", hourlyRentalController.delete);

module.exports = router;
