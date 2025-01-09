const express = require('express');
const adminController = require('../controllers/Admin/adminController');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');

router.post('/register', adminController.registerAdmin);
router.post('/login', adminController.loginAdmin);
router.get('/', authenticateToken, adminController.getAllAdmin);
router.put('/profile', authenticateToken, adminController.updateAdminProfile);
router.get('/search', adminController.searchAdmin);
router.delete('/profile', authenticateToken, adminController.deleteAdminProfile);
router.get('/profile', authenticateToken, adminController.getAdminProfile);
router.put('/reset-password', authenticateToken, adminController.resetPasswordAdmin);

module.exports = router;
