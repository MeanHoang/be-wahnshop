const db = require('../config/db');
const bcrypt = require('bcrypt');
require('dotenv').config();

class Product {

    static async create(data) {
        try {
            const [result] = await db.promise().query(
                'INSERT INTO product SET ?',
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

    static async update(productId, updateData) {
        try {
            const [result] = await db.promise().query(
                'UPDATE product SET ? WHERE id = ?',
                [updateData, productId]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error in update model:", error);
            throw error;
        }
    }

    static async delete(productId) {
        try {
            const query = `DELETE FROM product WHERE id = ?`;
            await db.execute(query, [productId]);
            return true;
        } catch (error) {
            console.error(`Error deleting product with ID ${productId}:`, error);
            throw error;
        }
    }

    //get all
    static async getAllProduct() {
        try {
            const [rows] = await db.promise().query(
                'SELECT * FROM product'
            );

            return rows;
        } catch (error) {
            console.error("Error in model:", error);
            throw error;
        }
    }


    static async getProductById(productId) {
        try {
            const [rows] = await db.promise().query(
                'SELECT * FROM product WHERE id = ?', [productId]);
            return rows[0] || null;
        } catch (error) {
            console.error("Error in model:", error);
            throw error;
        }
    }

    static async getProductByCategory(categoryId) {
        try {
            const [rows] = await db.promise().query(
                'SELECT * FROM product WHERE category_id = ?', [categoryId]);
            return rows[0] || null;
        } catch (error) {
            console.error("Error in model:", error);
            throw error;
        }
    }

}

module.exports = Product;
