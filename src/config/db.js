const mysql = require('mysql2/promise.js');
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
    } else {
        console.log('Connected to database with threadId:', connection.threadId);
        connection.release();
    }
});

module.exports = db;
