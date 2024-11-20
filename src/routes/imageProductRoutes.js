const express = require('express');
const router = express.Router();
const ImageProductController = require('../controllers/Product/imageProductController');

router.post('/create', ImageProductController.createImageProduct);
router.delete('/detail', ImageProductController.deleteImageProduct);
router.post('/detail', ImageProductController.setDefaultImageProduct);
router.get('/detail', ImageProductController.findImageProductByProductId);

module.exports = router;
