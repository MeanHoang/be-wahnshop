const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || '1'; // Replace '1' with your actual secret key

const generateToken = (user) => {
    const payload = {
        id: user.id,
        username: user.username,
    };

    return jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY); // Nếu token hợp lệ, trả về thông tin giải mã
    } catch (error) {
        console.error('Invalid token:', error.message);
        return null; // trả về null nếu token không hợp lệ
    }
};

const refreshToken = (token) => {
    try {
        const decoded = jwt.verify(token, SECRET_KEY); // Kiểm tra và giải mã token
        const newToken = generateToken({ id: decoded.id, username: decoded.username }); // Tạo token mới
        return newToken;
    } catch (error) {
        console.error('Invalid refresh token:', error.message);
        return null;
    }
};

module.exports = {
    generateToken,
    verifyToken,
    refreshToken
};
