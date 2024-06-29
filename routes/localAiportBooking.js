const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const bookingController = require("../controllers/localAriportBooking");

// Protect all routes after this middleware
router.use(authController.protect);
router.post("/local-airport-booking", bookingController.createBooking);
router.get("/local-airport-booking/user/:id", bookingController.getBookingsByUserId);
router.delete("/local-airport-booking/:id", bookingController.deleteBooking);

// Only admin have permission to access for the below APIs
// router.use(authController.restrictTo("admin"));

router.get("/local-airport-bookings", bookingController.getBookingList);
router.post("/local-airport-booking/cancel/:id", bookingController.cancelBooking);
router.post("/local-airport-booking/assign/:id", bookingController.assignDriver);
router.post("/local-airport-booking/accept/:id", bookingController.acceptBooking);

module.exports = router;
