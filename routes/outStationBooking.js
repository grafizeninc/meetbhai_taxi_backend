const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const bookingController = require("../controllers/outStatsionBooking");

// Protect all routes after this middleware
router.use(authController.protect);
router.post("/out-station-booking", bookingController.createBooking);
router.get("/out-station-booking/user/:id", bookingController.getBookingsByUserId);
router.delete("/out-station-booking/:id", bookingController.deleteBooking);

// Only admin have permission to access for the below APIs
// router.use(authController.restrictTo("admin"));

router.get("/out-station-bookings", bookingController.getBookingList);
router.post("/out-station-booking/accept/:id", bookingController.acceptBooking);
router.post("/out-station-booking/assign/:id", bookingController.assignDriver);

module.exports = router;
