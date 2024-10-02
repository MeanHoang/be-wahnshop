const express = require('express');
const adminController = require('../controllers/Admin/adminController');
const router = express.Router();

router.post('/register', adminController.registerAdmin);
router.post('/login', adminController.loginAdmin);

module.exports = router;