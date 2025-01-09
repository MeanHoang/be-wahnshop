const db = require('../config/db');

class ImageProduct {

    static async create(imgProductData) {
        const { product_id, image_url } = imgProductData; // Gán mặc định cho is_default nếu không có

        const query = `
            INSERT INTO image_product (product_id, image_url, is_default) 
            VALUES (?, ?, ?)
        `;
        try {
            const [result] = await db.promise().execute(query, [product_id, image_url, is_default]);
            console.log("Image product created with ID:", result.insertId);
            return result.insertId;
        } catch (error) {
            console.error("Error creating image product:", error);
            throw error;
        }
    }


    static async delete(imgProductId) {
        const query = `DELETE FROM image_product WHERE id = ?`;
        await db.promise().execute(query, [imgProductId]);
        return true;
    }

    static async setDefault(imgProductId) {
        try {
            console.log(`Request to set image product as default with ID: ${imgProductId}`);

            const [image] = await db.promise().execute('SELECT product_id FROM image_product WHERE id = ?', [imgProductId]);
            if (image.length === 0) {
                console.error("Image product not found");
                throw new Error("Image product not found");
            }

            const productId = image[0].product_id;

            await db.promise().execute('UPDATE image_product SET is_default = false WHERE product_id = ?', [productId]);
            await db.promise().execute('UPDATE image_product SET is_default = true WHERE id = ?', [imgProductId]);

            console.log(`Successfully set image product with ID: ${imgProductId} as default`);
        } catch (error) {
            console.error("Error setting image product as default:", error);
            throw error;
        }
    }

    static async findImgProductByProductId(productId) {
        const query = `
            SELECT * FROM image_product 
            WHERE product_id = ?
        `;
        const [rows] = await db.promise().execute(query, [productId]);
        return rows;
    }
}

module.exports = ImageProduct;
