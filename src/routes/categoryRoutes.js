const express = require('express');
const categoryController = require('../controllers/Product/categoryController.js');

const router = express.Router();

router.post('/create', categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.get('/detail', categoryController.getCategoryById);
router.put('/detail', categoryController.updateCategory);
router.delete('/detail', categoryController.deleteCategory);

module.exports = router;
