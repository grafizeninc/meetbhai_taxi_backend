const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const rolePermissionController = require("../controllers/rolePermission");

// Protect all routes after this middleware
router.use(authController.protect);

router.get("/role-permissions", rolePermissionController.getAll);
router.get("/role-permission/:id", rolePermissionController.getOne);

// Only admin have permission to access for the below APIs
router.use(authController.restrictTo("admin"));

router.post("/role-permission/:id", rolePermissionController.update);
router.post("/role-permission", rolePermissionController.add);
router.delete("/role-permission/:id", rolePermissionController.delete);

module.exports = router;
