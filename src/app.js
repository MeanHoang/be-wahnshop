const cors = require('./config/cors'); //config CORS
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const userShipment = require('./routes/userShipmentRouter');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const imageProductRoutes = require('./routes/imageProductRoutes')
const attributeRoutes = require('./routes/attributeRoutes');
const attributeOptionRoutes = require('./routes/attributeOptionRoutes');
const skuRoutes = require('./routes/skuRoutes');
const attributeOptionSkuRoutes = require('./routes/attributeOptionSkuRoutes');


dotenv.config();

const app = express();
app.use(bodyParser.json());
//config cors
app.use(cors);

//define all routes
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/user-shipment', userShipment);
app.use('/api/attribute', attributeRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);
app.use('/api/img-product', imageProductRoutes);
app.use('/api/attribute-option', attributeOptionRoutes);
app.use('/api/sku', skuRoutes);
app.use('/api/attribute-option-sku', attributeOptionSkuRoutes);

module.exports = app;