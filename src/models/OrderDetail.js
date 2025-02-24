const db = require('../config/db');
const bcrypt = require('bcrypt');
require('dotenv').config();

class OrderDetail {

    static async create(data) {
        try {
            const [result] = await db.promise().query(
                'INSERT INTO order_detail SET ?',
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

    static async update(order_detailId, updateData) {
        try {
            const [result] = await db.promise().query(
                'UPDATE order_detail SET ? WHERE id = ?',
                [updateData, order_detailId]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error in update model:", error);
            throw error;
        }
    }

    static async delete(order_detailId) {
        try {
            const query = `DELETE FROM order_detail WHERE id = ?`;
            await db.execute(query, [order_detailId]);
            return true;
        } catch (error) {
            console.error(`Error deleting order_detail with ID ${order_detailId}:`, error);
            throw error;
        }
    }

    //get all
    static async getAllOrderDetail() {
        try {
            const [rows] = await db.promise().query(
                'SELECT * FROM order_detail'
            );

            return rows || null;
        } catch (error) {
            console.error("Error in model:", error);
            throw error;
        }
    }


    static async getOrderDetailById(order_detailId) {
        try {
            const [rows] = await db.promise().query(
                'SELECT * FROM order_detail WHERE id = ?', [order_detailId]);
            return rows[0] || null;
        } catch (error) {
            console.error("Error in model:", error);
            throw error;
        }
    }

    static async getOrderDetailByUserId(usedId) {
        try {
            const [rows] = await db.promise().query(
                'SELECT * FROM order_detail WHERE used_id = ?', [usedId]);
            return rows || null;
        } catch (error) {
            console.error("Error in model:", error);
            throw error;
        }
    }

}

module.exports = OrderDetail;
