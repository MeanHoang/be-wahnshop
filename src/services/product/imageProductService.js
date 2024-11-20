const ImageProduct = require('../../models/ImageProduct');

class ImageProductService {

    static async createImageProduct(imgProductData) {
        try {
            console.log("Creating new image product with data:", imgProductData);
            const insertId = await ImageProduct.create(imgProductData);
            console.log("Image product created with ID:", insertId);
            return insertId;
        } catch (error) {
            console.error("Error creating image product:", error);
            throw error;
        }
    }

    static async deleteImageProduct(imgProductId) {
        try {
            console.log("Deleting image product with ID:", imgProductId);
            const result = await ImageProduct.delete(imgProductId);
            console.log("Image product deleted:", result);
            return result;
        } catch (error) {
            console.error("Error deleting image product:", error);
            throw error;
        }
    }

    static async setDefaultImageProduct(imgProductId) {
        try {
            console.log("Setting image product as default with ID:", imgProductId);
            const result = await ImageProduct.setDefault(imgProductId);
            console.log("Image product set as default:", result);
            return result;
        } catch (error) {
            console.error("Error setting image product as default:", error);
            throw error;
        }
    }

    static async findImageProductByProductId(productId) {
        try {
            console.log("Finding image products for product ID:", productId);
            const images = await ImageProduct.findImgProductByProductId(productId);
            console.log("Found image products:", images);
            return images;
        } catch (error) {
            console.error("Error finding image products by product ID:", error);
            throw error;
        }
    }
}

module.exports = ImageProductService;
