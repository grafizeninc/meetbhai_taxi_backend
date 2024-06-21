const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const referController = require("../controllers/refer")

// Protect all routes after this middleware
router.use(authController.protect);

// Only admin have permission to access for the below APIs
// router.use(authController.restrictTo("admin"));

router.post('/refer', referController.addRefer);

module.exports = router;
