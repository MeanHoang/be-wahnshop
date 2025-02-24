const jwt = require('jsonwebtoken');

const USER_SECRET_KEY = process.env.JWT_USER_SECRET || '1';

const generateUserToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        role: "user",
    };

    return jwt.sign(payload, USER_SECRET_KEY, { expiresIn: '7d' });
};

const verifyUserToken = (token) => {
    try {
        return jwt.verify(token, USER_SECRET_KEY);
    } catch (error) {
        console.error('Invalid user token:', error.message);
        return null;
    }
};

const refreshUserToken = (token) => {
    try {
        const decoded = jwt.verify(token, USER_SECRET_KEY);
        return generateUserToken({ id: decoded.id, email: decoded.email });
    } catch (error) {
        console.error('Invalid refresh token:', error.message);
        return null;
    }
};

module.exports = {
    generateUserToken,
    verifyUserToken,
    refreshUserToken
};
