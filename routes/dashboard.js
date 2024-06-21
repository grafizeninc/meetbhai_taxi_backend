const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const dashboardController = require("../controllers/dashboard");

// Protect all routes after this middleware
router.use(authController.protect);

// Only admin have permission to access for the below APIs
router.use(authController.restrictTo("admin"));

router.get("/dashboard", dashboardController.getDashboardDetails);

module.exports = router;
