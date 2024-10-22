const express = require('express');
const adminController = require('../controllers/Admin/adminController');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');

router.post('/register', adminController.registerAdmin);
router.post('/login', adminController.loginAdmin);
router.get('/', adminController.getAllAdmin);
// router.get('/', authenticateToken, adminController.getAllAdmin);
router.put('/profile', adminController.updateAdminProfile);
router.delete('/profile', adminController.deleteAdminProfile);
router.get('/profile', adminController.getAdminProfile);
router.get('/search', adminController.searchAdmin);

module.exports = router;