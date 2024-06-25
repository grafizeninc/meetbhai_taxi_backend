const express = require('express')
const router = express.Router();
const faqController = require('../controllers/faq');
const authController = require('../controllers/auth');
router.use(authController.protect);
// router.get('/faq/:id', faqController.getOne);
router.get('/faqs', faqController.getAll);
router.post('/faq', faqController.add);
router.post('/faq/edit/:id', faqController.update);
router.delete('/faq/:id', faqController.delete);
module.exports = router;