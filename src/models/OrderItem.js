const db = require('../config/db');
const bcrypt = require('bcrypt');
require('dotenv').config();

class OrderItem {

    static async create(data) {
        try {
            const [result] = await db.promise().query(
                'INSERT INTO order_item SET ?',
                data
            );

            if (result.affectedRows === 0) {
                throw new Error('Create failed!');
            }

            console.log("check result: ", result);

            return { id: result.insertId, ...data };
        } catch (error) {
            console.error("Error in model:", error);
            throw error;
        }
    }

    static async update(order_itemId, updateData) {
        try {
            const [result] = await db.promise().query(
                'UPDATE order_item SET ? WHERE id = ?',
                [updateData, order_itemId]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error in update model:", error);
            throw error;
        }
    }

    static async delete(order_itemId) {
        try {
            const query = `DELETE FROM order_item WHERE id = ?`;
            await db.execute(query, [order_itemId]);
            return true;
        } catch (error) {
            console.error(`Error deleting order_item with ID ${order_itemId}:`, error);
            throw error;
        }
    }

    //get all
    static async getAllOrderItem() {
        try {
            const [rows] = await db.promise().query(
                'SELECT * FROM order_item'
            );

            return rows;
        } catch (error) {
            console.error("Error in model:", error);
            throw error;
        }
    }


    static async getOrderItemById(order_itemId) {
        try {
            const [rows] = await db.promise().query(
                'SELECT * FROM order_item WHERE id = ?', [order_itemId]);
            return rows[0] || null;
        } catch (error) {
            console.error("Error in model:", error);
            throw error;
        }
    }

    static async getOrderItemByOrderDetailId(orderDetailId) {
        try {
            const [rows] = await db.promise().query(
                'SELECT * FROM order_item WHERE order_id = ?', [orderDetailId]);
            return rows || null;
        } catch (error) {
            console.error("Error in model:", error);
            throw error;
        }
    }

}

module.exports = OrderItem;
