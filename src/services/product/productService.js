const Product = require('../../models/Product');
const bcrypt = require('bcrypt');

class ProductService {

    static async createProduct(productData) {
        try {
            const productId = await Product.create(productData);
            
            console.log("Product created with ID:", productId);
            return productId;
        } catch (error) {
            console.error("Error in ProductService - createProduct:", error);
            throw error;
        }
    }

    static async getAllProduct() {
        try {
            const products = await Product.getAllProduct();
            console.log("Retrieved all products");
            return products;
        } catch (error) {
            console.error("Error in ProductService - getAllProduct:", error);
            throw error;
        }
    }

    static async getProductById(productId) {
        try {
            const product = await Product.getProductById(productId);
            console.log(`Retrieved product with ID ${productId}`);
            return product;
        } catch (error) {
            console.error(`Error in ProductService - getProductById for ID ${productId}:`, error);
            throw error;
        }
    }

    static async updateProduct(productId, updateData) {
        try {
            await Product.update(productId, updateData);
            console.log(`Product with ID ${productId} updated`);
        } catch (error) {
            console.error(`Error in ProductService - updateProduct for ID ${productId}:`, error);
            throw error;
        }
    }

    static async deleteProduct(productId) {
        try {
            await Product.delete(productId);
            console.log(`Product with ID ${productId} deleted`);
        } catch (error) {
            console.error(`Error in ProductService - deleteProduct for ID ${productId}:`, error);
            throw error;
        }
    }

    static async getProductByCategory(categoryId) {
        try {
            const products = await Product.getProductByCategory(categoryId);
            console.log(`Retrieved products for category ID ${categoryId}`);
            return products;
        } catch (error) {
            console.error(`Error in ProductService - getProductByCategory for category ID ${categoryId}:`, error);
            throw error;
        }
    }
}

module.exports = ProductService;
