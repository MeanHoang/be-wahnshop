const { verifyToken } = require('../utils/tokenUtils'); // import hàm verifyToken từ file tokenUtils

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // lấy token từ header

    if (!token) {
        return res.sendStatus(403); // Không có token
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.sendStatus(403); // Token không hợp lệ
    }

    req.user = decoded; // lưu thông tin người dùng vào request
    next(); // tiếp tục tới middleware hoặc route handler tiếp theo
};

module.exports = authenticateToken;
