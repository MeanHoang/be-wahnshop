const jwt = require('jsonwebtoken');

//Create a token
exports.generateToken = (user) => {
    //Create and respone token
    // payload: user.id 
    //expiry: 1 hours -- hạn sử dụng
    return jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Middleware to verify token
exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Lấy token từ header
    if (!token) return res.status(403).send('No token provided.');

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Error verifying token:', err);
            return res.status(401).send({ error: 'Failed to authenticate token', details: err.message });
        }
        req.user = decoded; // Gán giá trị decoded vào req.user
        console.log('User ID from token:', req.user.id); // Thêm log để kiểm tra
        next();
    });
};

