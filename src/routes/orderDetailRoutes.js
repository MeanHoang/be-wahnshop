const express = require('express');
const OrderDetailController = require('../controllers/Order/orderDetailController');

const router = express.Router();

router.post('/', OrderDetailController.create);
router.get('/', OrderDetailController.getAll);
router.get('/:id', OrderDetailController.getById);
router.put('/:id', OrderDetailController.update);
router.delete('/:id', OrderDetailController.delete);
router.get('/user/:userId', OrderDetailController.getByUserId);

module.exports = router;
