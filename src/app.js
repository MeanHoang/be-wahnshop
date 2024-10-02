const cors = require('./config/cors'); //config CORS
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const adminRoutes = require('./routes/adminRoutes');
dotenv.config();

const app = express();
app.use(bodyParser.json());
//config cors
app.use(cors);

//define all routes
app.use('/api/admin', adminRoutes);

module.exports = app;