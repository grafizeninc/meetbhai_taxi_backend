const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const driverController = require("../controllers/driver");
const {storage} = require('../utils/fileUpload');
const multer = require('multer');
const upload = multer({storage: storage});
const uploadImages = upload.fields([
    { name: 'rcBook', maxCount: 1 },
    { name: 'licence', maxCount: 1 },
    { name: 'insurance', maxCount: 1 }
])

// Protect all routes after this middleware
router.use(authController.protect);

// Only admin have permission to access for the below APIs
router.use(authController.restrictTo("admin"));

router.post("/driver", uploadImages ,driverController.add);
router.get("/drivers", driverController.getAll);
router.post("/driver/:id", driverController.update);
router.get("/driver/:id", driverController.getOne);
router.delete("/driver/:id", driverController.delete);

module.exports = router;
