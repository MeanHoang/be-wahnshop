const express = require('express');
const userController = require('../controllers/User/userController');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');

router.post('/create', userController.registerUser);
router.get('/', authenticateToken, userController.getAllUser);
router.get('/profile', userController.getUserProfile);
router.put('/profile', userController.updateUserProfile);
router.delete('/profile', userController.deleteUserProfile);
router.put('/reset-password', userController.resetUserPassword);

module.exports = router;