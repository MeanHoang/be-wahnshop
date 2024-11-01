const express = require('express');
const userController = require('../controllers/User/userController');
const router = express.Router();

router.post('/register', userController.registerUser);
router.get('/', userController.getAllUser);
router.get('/profile', userController.getUserProfile);
router.put('/profile', userController.updateUserProfile);
router.delete('/profile', userController.deleteUserProfile);
router.put('/reset-password', userController.resetUserPassword);

module.exports = router;