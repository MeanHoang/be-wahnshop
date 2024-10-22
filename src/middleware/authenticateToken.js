const { verifyToken } = require('../utils/tokenUtils');

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Lấy token từ header
    if (!token) return res.status(401).json({ message: 'Access Denied. No Token Provided.' });

    try {
        const verified = verifyToken(token); // Xác thực token
        req.user = verified; // Lưu thông tin người dùng vào request
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

module.exports = authenticateToken;
