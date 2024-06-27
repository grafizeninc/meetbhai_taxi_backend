const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const faqController = require("../controllers/faq");

// Protect all routes after this middleware
router.use(authController.protect);
router.get("/faqs", faqController.getAll);

// Only admin have permission to access for the below APIs

// router.use(authController.restrictTo("admin"));
router.post("/faq", faqController.add);
router.post("/faq/:id", faqController.update);
router.delete("/faq/:id", faqController.delete);

module.exports = router;
