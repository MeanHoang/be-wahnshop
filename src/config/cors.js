const cors = require('cors');

const corsOptions = {
    // origin: ['http://localhost:3000', 'https://meanhoang-fe-admin.vercel.app/'], // Cho phép nhiều domain
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};

module.exports = cors(corsOptions);
