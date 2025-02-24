const express = require('express');
const router = express.Router();
const OrderItemController = require('../controllers/Order/orderItemController');

// Tạo order item mới
router.post('/', OrderItemController.createOrderItem);

// Lấy tất cả order items
router.get('/', OrderItemController.getAllOrderItems);

// Lấy order item theo ID
router.get('/:id', OrderItemController.getOrderItemById);

// Lấy danh sách order items theo order_detail_id
router.get('/order/:orderDetailId', OrderItemController.getOrderItemsByOrderDetailId);

// Cập nhật order item theo ID
router.put('/:id', OrderItemController.updateOrderItem);

// Xóa order item theo ID
router.delete('/:id', OrderItemController.deleteOrderItem);

module.exports = router;
