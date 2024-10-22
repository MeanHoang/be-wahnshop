const express = require('express');
const userController = require('../controllers/User/userController');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');

router.post('/register', userController.registerUser);

module.exports = router;