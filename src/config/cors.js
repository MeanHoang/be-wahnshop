const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3000', // Enable frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Allow cookies
};

module.exports = cors(corsOptions);
