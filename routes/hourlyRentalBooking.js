const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const bookingController = require("../controllers/hourlyRentalBooking");

// Protect all routes after this middleware
router.use(authController.protect);
router.post("/hourly-rental-booking", bookingController.createBooking);
router.get("/hourly-rental-booking/user/:id", bookingController.getBookingsByUserId);
router.delete("/hourly-rental-booking/:id", bookingController.deleteBooking);

// Only admin have permission to access for the below APIs
// router.use(authController.restrictTo("admin"));

router.get("/hourly-rental-bookings", bookingController.getBookingList);
router.post("/hourly-rental-booking/accept/:id", bookingController.acceptBooking);
router.post("/hourly-rental-booking/assign/:id", bookingController.assignDriver);

module.exports = router;
