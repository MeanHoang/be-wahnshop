const db = require('../config/db');

class Sku {

    static async create(skuData) {
        try {
            const { product_id, price, quantity } = skuData;
            const query = `
                INSERT INTO sku ( product_id, price, quantity) 
                VALUES (?, ?, ?)
            `;
            const [result] = await db.execute(query, [product_id, price, quantity]);
            return result.insertId;
        } catch (error) {
            console.error("Error creating sku:", error);
            throw error;
        }
    }

}

module.exports = Sku;
