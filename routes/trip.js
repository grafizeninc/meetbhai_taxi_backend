const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const tripController = require("../controllers/trip");

// Protect all routes after this middleware
router.use(authController.protect);

router.get("/trips", tripController.getAll);
router.get("/trip/:id", tripController.getOne);

// Only admin have permission to access for the below APIs
// router.use(authController.restrictTo("admin"));

router.post("/trip/:id", tripController.update);
router.post("/trip", tripController.add);
router.delete("/trip/:id", tripController.delete);

module.exports = router;
