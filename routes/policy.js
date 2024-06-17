const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const policyController = require("../controllers/policy");

// Protect all routes after this middleware
router.use(authController.protect);
router.get("/policies", policyController.getAll);

// Only admin have permission to access for the below APIs

router.use(authController.restrictTo("admin"));
router.post("/policy", policyController.add);
router.post("/policy/:id", policyController.update);
router.get("/policy/:id", policyController.getOne);
router.delete("/policy/:id", policyController.delete);

module.exports = router;
