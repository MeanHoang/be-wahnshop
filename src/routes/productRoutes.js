const express = require('express');
const productController = require('../controllers/product/productController');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');

// Tạo sản phẩm
router.post('/create', authenticateToken, productController.createProduct);

// Cập nhật sản phẩm
router.put('/detail', authenticateToken, productController.updateProduct);

// Xóa sản phẩm
router.delete('/detail', authenticateToken, productController.deleteProduct);

// Lấy tất cả sản phẩm
router.get('/', productController.getAllProduct);

// Lấy thông tin chi tiết sản phẩm theo ID
router.get('/detail', productController.getProductById);

// Lấy sản phẩm theo danh mục
router.get('/product-category', productController.getProductByCategory);

module.exports = router;
