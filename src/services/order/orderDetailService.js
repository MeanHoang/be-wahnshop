const OrderDetail = require('../../models/OrderDetail');
const bcrypt = require('bcrypt');

class OrderDetailService {

    static async createOrderDetail(oderDetailData) {
        try {
            const oderDetailId = await OrderDetail.create(oderDetailData);

            console.log("OrderDetail created with ID:", oderDetailId);
            return oderDetailId;
        } catch (error) {
            throw error;
        }
    }

    static async getAllOrderDetail() {
        try {
            const oderDetails = await OrderDetail.getAllOrderDetail();
            console.log("Retrieved all oderDetails");
            return oderDetails;
        } catch (error) {
            throw error;
        }
    }

    static async getOrderDetailById(oderDetailId) {
        try {
            const oderDetail = await OrderDetail.getOrderDetailById(oderDetailId);
            console.log(`Retrieved oderDetail with ID ${oderDetailId}`);
            return oderDetail;
        } catch (error) {
            throw error;
        }
    }

    static async updateOrderDetail(oderDetailId, updateData) {
        try {
            await OrderDetail.update(oderDetailId, updateData);
            console.log(`OrderDetail with ID ${oderDetailId} updated`);
        } catch (error) {
            throw error;
        }
    }

    static async deleteOrderDetail(oderDetailId) {
        try {
            await OrderDetail.delete(oderDetailId);
            console.log(`OrderDetail with ID ${oderDetailId} deleted`);
        } catch (error) {
            throw error;
        }
    }

    static async getOrderDetailByUserId(usedId) {
        try {
            const oderDetails = await OrderDetail.getOrderDetailByUserId(usedId);
            console.log(`Retrieved oderDetails for used ID ${usedId}`);
            return oderDetails;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = OrderDetailService;
