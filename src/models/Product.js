const db = require('../config/db');

class Product {

    static async create(productData) {
        try {
            const { category_id, name, description, price } = productData;
            const query = `
                INSERT INTO product (category_id, name, description, price) 
                VALUES (?, ?, ?, ?)
            `;
            const [result] = await db.execute(query, [category_id, name, description, price]);
            return result.insertId;
        } catch (error) {
            console.error("Error creating product:", error);
            throw error;
        }
    }

    static async update(productId, updateData) {
        try {
            const { name, description, price } = updateData;
            const query = `
                UPDATE product 
                SET name = ?, description = ?, price = ? 
                WHERE id = ?
            `;
            await db.execute(query, [name, description, price, productId]);
            return true;
        } catch (error) {
            console.error(`Error updating product with ID ${productId}:`, error);
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

    static async getAllProduct() {
        try {
            const query = `
                SELECT p.*, ip.image_url 
                FROM product p 
                LEFT JOIN image_product ip ON p.id = ip.product_id AND ip.is_default = true
            `;
            const [rows] = await db.execute(query);
            return rows;
        } catch (error) {
            console.error("Error retrieving all products:", error);
            throw error;
        }
    }

    static async getProductById(productId) {
        try {
            const query = `
                SELECT p.*, ip.image_url 
                FROM product p 
                LEFT JOIN image_product ip ON p.id = ip.product_id AND ip.is_default = true 
                WHERE p.id = ?
            `;
            const [rows] = await db.execute(query, [productId]);
            return rows[0] || null; // Trả về null nếu không tìm thấy sản phẩm
        } catch (error) {
            console.error(`Error retrieving product with ID ${productId}:`, error);
            throw error;
        }
    }

    static async getProductByCategory(categoryId) {
        try {
            const query = `
                SELECT p.*, ip.image_url 
                FROM product p 
                LEFT JOIN image_product ip ON p.id = ip.product_id AND ip.is_default = true 
                WHERE p.category_id = ?
            `;
            const [rows] = await db.execute(query, [categoryId]);
            return rows;
        } catch (error) {
            console.error(`Error retrieving products for category ID ${categoryId}:`, error);
            throw error;
        }
    }

}

module.exports = Product;
