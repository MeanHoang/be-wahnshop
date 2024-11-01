const cors = require('./config/cors'); //config CORS
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const userShipment = require('./routes/userShipmentRouter');
dotenv.config();

const app = express();
app.use(bodyParser.json());
//config cors
app.use(cors);

//define all routes
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/user-shipment', userShipment);

module.exports = app;