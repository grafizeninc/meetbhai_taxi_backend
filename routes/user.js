const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const authController = require("../controllers/auth");
const otpController = require("../controllers/otp");

router.post("/login", authController.login);
router.post("/signup", authController.signup);

router.post("/admin/login", authController.adminLogin);
router.post("/admin/signup", authController.adminSignup);

// Protect all routes after this middleware
router.use(authController.protect);

router.get('/users', userController.getAll);
router.get('/user/:id', userController.getUser);

// Admin users with role id
router.post("/admin-user", userController.adminUser);


// Only admin have permission to access for the below APIs
// router.use(authController.restrictTo("admin"));

// router.get('/users', userController.getAll);
// router.get('/user/:id', userController.getUser);
router.put('/user/edit/:id', userController.update);
router.delete('/user/delete/:id', userController.delete);



router.get('/admin-user/:id', userController.getAdminUser);
router.get('/all-admin-users', userController.getAllAdminUser);
router.post('/admin-user/edit/:id', userController.updateAdminUser);
router.delete('/admin-user/delete/:id', userController.deleteAdminUser);

// OTP
router.post("/user/send-otp", otpController.sendOtp);
router.post("/user/verify-otp", otpController.verifyOtp);


module.exports = router;
