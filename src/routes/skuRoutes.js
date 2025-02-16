const express = require('express');
const skuController = require('../controllers/product/skuController');
const router = express.Router();
const upload = require('../config/multer');
const authenticateToken = require('../middleware/authenticateToken');

// Tạo sản phẩm
router.post('/create', upload.single('image'), authenticateToken, skuController.createSku);

// Cập nhật sản phẩm
router.put('/detail', upload.single('image'), authenticateToken, skuController.updateSku);

// Xóa sản phẩm
router.delete('/detail', authenticateToken, skuController.deleteSku);

// Lấy tất cả sản phẩm
router.get('/', skuController.getAllSku);

// Lấy thông tin chi tiết sản phẩm theo ID
router.get('/detail', skuController.getSkuById);

// Lấy sản phẩm theo sản phẩm
router.get('/sku-product', skuController.getSkuByProduct);

module.exports = router;
