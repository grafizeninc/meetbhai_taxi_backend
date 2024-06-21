const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const bookingController = require("../controllers/booking");

// Protect all routes after this middleware
router.use(authController.protect);
router.get("/all-booking/user/:id", bookingController.getBookingsByUserId);
router.get("/booking-summery", bookingController.getBookingSummery);
router.get("/booking-receipt", bookingController.getBookingReceipt);

// Only admin have permission to access for the below APIs
// router.use(authController.restrictTo("admin"));

router.get("/all-bookings", bookingController.getBookingList);

module.exports = router;
