const jwt = require('jsonwebtoken');

// Hàm tạo token
const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, username: user.username },   // Payload
        process.env.JWT_SECRET,                     // Secret key
        { expiresIn: '1h' }                         // Thời gian hết hạn
    );
};

// Hàm xác thực token
const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid Token');
    }
};

module.exports = { generateToken, verifyToken };
