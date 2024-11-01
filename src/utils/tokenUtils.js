const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || '1';

const generateToken = (user) => {
    const payload = {
        id: user.id,
        username: user.username,
    };

    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        console.error('Invalid token:', error.message);
        return null;
    }
};

const refreshToken = (token) => {
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const newToken = generateToken({ id: decoded.id, username: decoded.username });
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
