const { verifyToken } = require('../utils/tokenUtils'); // Import verifyToken từ tokenUtils

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Lấy token từ header

    if (!token) {
        return res.status(403).json({ message: 'Login falied' }); // Không có token
    }

    const decoded = verifyToken(token); // Sử dụng verifyToken

    if (!decoded) {
        return res.status(403).json({ message: 'Token invaid' }); // Token không hợp lệ
    }

    req.user = decoded; // Lưu thông tin người dùng vào request
    next(); // Tiếp tục tới middleware hoặc route handler tiếp theo
};

module.exports = authenticateToken;
