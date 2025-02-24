const OrderDetailService = require('../../services/order/orderDetailService');

class OrderDetailController {

    static async create(req, res) {
        try {
            const newOrderDetail = await OrderDetailService.createOrderDetail(req.body);
            res.status(201).json({ success: true, data: newOrderDetail });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async getAll(req, res) {
        console.log('Get All OrderDetails Request:', req.query);
        const { page = 1, limit = 7, searchTerm = '' } = req.query;
        const pageNumber = parseInt(page);
        const pageSize = parseInt(limit);
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = pageNumber * pageSize;

        try {
            const allOrderDetails = await OrderDetailService.getAllOrderDetail();

            // Lọc dữ liệu theo searchTerm nếu có
            const filteredOrderDetails = allOrderDetails.filter(order =>
                order.id.toString().includes(searchTerm) ||
                order.user_id.toString().includes(searchTerm) // Cập nhật field tùy vào database
            );

            // Cắt danh sách theo trang
            const paginatedOrderDetails = filteredOrderDetails.slice(startIndex, endIndex);

            console.log(`Filtered OrderDetails: ${filteredOrderDetails.length}, Page: ${pageNumber}, Showing: ${paginatedOrderDetails.length}`);

            res.json({
                total: filteredOrderDetails.length,
                page: pageNumber,
                limit: pageSize,
                orders: paginatedOrderDetails,
            });
        } catch (error) {
            console.error('Error in getAllOrderDetail:', error.message);
            res.status(500).json({ success: false, message: error.message });
        }
    }


    static async getById(req, res) {
        try {
            const { id } = req.params;
            const orderDetail = await OrderDetailService.getOrderDetailById(id);

            if (!orderDetail) {
                return res.status(404).json({ success: false, message: "Order Detail not found!" });
            }

            res.status(200).json({ success: true, data: orderDetail });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            await OrderDetailService.updateOrderDetail(id, req.body);

            res.status(200).json({ success: true, message: "Updated successfully!" });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            await OrderDetailService.deleteOrderDetail(id);

            res.status(200).json({ success: true, message: "Deleted successfully!" });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async getByUserId(req, res) {
        try {
            const { userId } = req.params;
            const orderDetails = await OrderDetailService.getOrderDetailByUserId(userId);

            if (!orderDetails.length) {
                return res.status(404).json({ success: false, message: "No order details found for this user!" });
            }

            res.status(200).json({ success: true, data: orderDetails });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

module.exports = OrderDetailController;
