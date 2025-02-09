const express = require('express');
const attributeOptionController = require('../controllers/Product/atributeOptionController');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

router.post('/create', authenticateToken, attributeOptionController.createAttributeOption);

router.get('/', attributeOptionController.getAllAttributeOptions);

router.get('/detail', attributeOptionController.findAttributeOptionById);

router.put('/detail', authenticateToken, attributeOptionController.updateAttributeOption);

router.delete('/detail', authenticateToken, attributeOptionController.deleteAttributeOption);

router.get('/get-by-attributeId', attributeOptionController.findAttributeOptionByAttributeId);

module.exports = router;
