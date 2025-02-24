const OrderItem = require('../../models/OrderItem');

class OrderItemService {
    static async createOrderItem(data) {
        try {
            return await OrderItem.create(data);
        } catch (error) {
            throw new Error(`Failed to create order item: ${error.message}`);
        }
    }

    static async updateOrderItem(order_itemId, updateData) {
        try {
            const updated = await OrderItem.update(order_itemId, updateData);
            if (!updated) {
                throw new Error('Update failed! Order item not found.');
            }
            return true;
        } catch (error) {
            throw new Error(`Failed to update order item: ${error.message}`);
        }
    }

    static async deleteOrderItem(order_itemId) {
        try {
            return await OrderItem.delete(order_itemId);
        } catch (error) {
            throw new Error(`Failed to delete order item: ${error.message}`);
        }
    }

    static async getAllOrderItems() {
        try {
            return await OrderItem.getAllOrderItem();
        } catch (error) {
            throw new Error(`Failed to fetch order items: ${error.message}`);
        }
    }

    static async getOrderItemById(order_itemId) {
        try {
            const orderItem = await OrderItem.getOrderItemById(order_itemId);
            if (!orderItem) {
                throw new Error('Order item not found');
            }
            return orderItem;
        } catch (error) {
            throw new Error(`Failed to fetch order item: ${error.message}`);
        }
    }

    static async getOrderItemsByOrderDetailId(orderDetailId) {
        try {
            return await OrderItem.getOrderItemByOrderDetailId(orderDetailId);
        } catch (error) {
            throw new Error(`Failed to fetch order items for order detail ID ${orderDetailId}: ${error.message}`);
        }
    }
}

module.exports = OrderItemService;
