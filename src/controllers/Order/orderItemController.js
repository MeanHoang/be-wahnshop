const OrderItemService = require('../../services/order/orderItemService');

class OrderItemController {
    static async createOrderItem(req, res) {
        try {
            const orderItem = await OrderItemService.createOrderItem(req.body);
            res.status(201).json(orderItem);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAllOrderItems(req, res) {
        try {
            const orderItems = await OrderItemService.getAllOrderItems();
            res.status(200).json(orderItems);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getOrderItemById(req, res) {
        try {
            const orderItem = await OrderItemService.getOrderItemById(req.params.id);
            if (!orderItem) {
                return res.status(404).json({ message: 'Order item not found' });
            }
            res.status(200).json(orderItem);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getOrderItemsByOrderDetailId(req, res) {
        try {
            const orderItems = await OrderItemService.getOrderItemsByOrderDetailId(req.params.orderDetailId);
            res.status(200).json(orderItems);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateOrderItem(req, res) {
        try {
            const success = await OrderItemService.updateOrderItem(req.params.id, req.body);
            if (!success) {
                return res.status(404).json({ message: 'Order item not found' });
            }
            res.status(200).json({ message: 'Order item updated successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteOrderItem(req, res) {
        try {
            const success = await OrderItemService.deleteOrderItem(req.params.id);
            if (!success) {
                return res.status(404).json({ message: 'Order item not found' });
            }
            res.status(200).json({ message: 'Order item deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = OrderItemController;
