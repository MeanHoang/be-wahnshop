const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Cấu hình Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, // Lấy từ Dashboard
    api_key: process.env.CLOUD_API_KEY, // Lấy từ Dashboard
    api_secret: process.env.CLOUD_API_SECRET, // Lấy từ Dashboard
});


module.exports = cloudinary;
