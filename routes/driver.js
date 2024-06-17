const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const driverController = require("../controllers/driver");

// Protect all routes after this middleware
router.use(authController.protect);

// Only admin have permission to access for the below APIs
router.use(authController.restrictTo("admin"));

router.post("/driver", driverController.add);
router.get("/drivers", driverController.getAll);
router.post("/driver/:id", driverController.update);
router.get("/driver/:id", driverController.getOne);
router.delete("/driver/:id", driverController.delete);

module.exports = router;
