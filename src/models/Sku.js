const db = require('../config/db');

class Sku {

    static async create(data) {
        try {
            const [result] = await db.promise().query(
                'INSERT INTO sku SET ?',
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

    static async update(skuId, updateData) {
        try {
            const [result] = await db.promise().query(
                'UPDATE sku SET ? WHERE id = ?',
                [updateData, skuId]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error in update model:", error);
            throw error;
        }
    }

    static async delete(skuId) {
        try {
            const query = `DELETE FROM sku WHERE id = ?`;
            await db.execute(query, [skuId]);
            return true;
        } catch (error) {
            console.error(`Error deleting sku with ID ${skuId}:`, error);
            throw error;
        }
    }

    //get all
    static async getAllSku() {
        try {
            const [rows] = await db.promise().query(
                'SELECT * FROM sku'
            );

            return rows;
        } catch (error) {
            console.error("Error in model:", error);
            throw error;
        }
    }


    static async getSkuById(skuId) {
        try {
            const [rows] = await db.promise().query(
                'SELECT * FROM sku WHERE id = ?', [skuId]);
            return rows[0] || null;
        } catch (error) {
            console.error("Error in model:", error);
            throw error;
        }
    }


    static async getSkyByProduct(productId) {
        try {
            const [rows] = await db.promise().query(
                'SELECT * FROM sku WHERE product_id = ?', [productId]);
            return rows;
        } catch (error) {
            console.error("Error in model:", error);
            throw error;
        }
    }

}

module.exports = Sku;
