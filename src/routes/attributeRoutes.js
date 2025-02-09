const express = require('express');
const attributeController = require('../controllers/Product/attributeController');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

router.post('/create', authenticateToken, attributeController.createAttribute);
router.get('/', attributeController.getAllAttributes);
router.get('/detail', attributeController.getAttributeById);
router.put('/detail', authenticateToken, attributeController.updateAttribute);
router.delete('/detail', authenticateToken, attributeController.deleteAttribute);

module.exports = router;
