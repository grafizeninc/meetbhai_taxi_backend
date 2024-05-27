const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const couponController = require('./../controllers/couponController');



// Protect all routes after this middleware
router.use(authController.protect);

router.get('/coupons', couponController.getAll);
router.get('/coupon/:id', couponController.getOne);


// Only admin have permission to access for the below APIs 
router.use(authController.restrictTo('admin'));

router.post('/coupon/:id', couponController.update);
router.post('/coupon', couponController.add);
router.delete('/coupon/:id', couponController.delete);


module.exports = router;