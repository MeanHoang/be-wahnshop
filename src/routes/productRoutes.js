const express = require('express');
const productController = require('../controllers/product/productController');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');

router.post('/create', productController.createProduct);

router.put('/detail', productController.updateProduct);

router.delete('/detail', productController.deleteProduct);

router.get('/', productController.getAllProduct);

router.get('/detail', productController.getProductById);

router.get('/product-category', productController.getProductByCategory);
module.exports = router;
