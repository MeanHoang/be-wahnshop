const express = require('express');
const router = express.Router();
const AttributeOptionSkuController = require('../controllers/Product/AttributeOptionSkuController');

router.post('/create', AttributeOptionSkuController.create);
router.put('/:skuId', AttributeOptionSkuController.update);
router.delete('/:skuId/:attributeOptionId', AttributeOptionSkuController.remove);
router.get('/', AttributeOptionSkuController.getAll);
router.get('/:skuId', AttributeOptionSkuController.getById);

module.exports = router;
