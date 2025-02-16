const db = require('../config/db');

class AttributeOptionSku {

    static async create(data) {
        try {
            const [result] = await db.promise().query(
                'INSERT INTO attribute_option_sku  SET ?',
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
    }

    static async delete(sku_id, attribute_option_id) {
        try {
            const query = `DELETE FROM attribute_option_sku 
                           WHERE sku_id = ? AND attribute_option_id = ?`;
            await db.execute(query, [sku_id, attribute_option_id]);
            return true;
        } catch (error) {
            console.error(`Error deleting record with sku_id ${sku_id} and attribute_option_id ${attribute_option_id}:`, error);
            throw error;
        }
    }


    //get all
    static async getAllAttributeOptionSku() {
        try {
            const [rows] = await db.promise().query(
                'SELECT * FROM attribute_option_sku'
            );

            return rows;
        } catch (error) {
            console.error("Error in model:", error);
            throw error;
        }
    }


    static async getAttributeOptionSkuById(skuId) {
        try {
            const [rows] = await db.promise().query(
                'SELECT * FROM attribute_option_sku WHERE sku_id = ?', [skuId]);
            return rows;
        } catch (error) {
            console.error("Error in model:", error);
            throw error;
        }
    }

}

module.exports = AttributeOptionSku;
