const express = require('express');
const categoryController = require('../controllers/Product/categoryController');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

router.post('/create', authenticateToken, categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.get('/detail', categoryController.getCategoryById);
router.put('/detail', authenticateToken, categoryController.updateCategory);
router.delete('/detail', authenticateToken, categoryController.deleteCategory);
router.get('/is-active', categoryController.getAllCategoryActive);

module.exports = router;
