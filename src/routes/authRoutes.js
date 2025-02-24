const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route yêu cầu đăng nhập Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Route xử lý callback sau khi Google xác thực
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.json({ message: 'Login successful', user: req.user });
    }
);

module.exports = router;
