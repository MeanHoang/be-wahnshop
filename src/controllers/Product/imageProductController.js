const ImageProductService = require('../../services/product/imageProductService');

class ImageProductController {

    static async createImageProduct(req, res) {
        try {
            console.log("Request to create image product with data:", req.body);
            const newImageProductId = await ImageProductService.createImageProduct(req.body);
            console.log("Image product created successfully with ID:", newImageProductId);
            return res.status(201).json({ id: newImageProductId });
        } catch (error) {
            console.error("Error in createImageProduct:", error);
            return res.status(500).json({ message: "Error creating image product" });
        }
    }

    static async deleteImageProduct(req, res) {
        try {
            const { id } = req.body;
            console.log("Request to delete image product with ID:", id);
            const result = await ImageProductService.deleteImageProduct(id);
            console.log("Image product deleted successfully with result:", result);
            return res.status(200).json({ message: "Image product deleted" });
        } catch (error) {
            console.error("Error in deleteImageProduct:", error);
            return res.status(500).json({ message: "Error deleting image product" });
        }
    }

    static async setDefaultImageProduct(req, res) {
        try {
            const { id } = req.body;
            console.log("Request to set image product as default with ID:", id);
            const result = await ImageProductService.setDefaultImageProduct(id);
            console.log("Image product set as default successfully with result:", result);
            return res.status(200).json({ message: "Image product set as default" });
        } catch (error) {
            console.error("Error in setDefaultImageProduct:", error);
            return res.status(500).json({ message: "Error setting image product as default" });
        }
    }

    static async findImageProductByProductId(req, res) {
        try {
            const { product_id } = req.body;
            console.log("Request to find image products for product ID:", product_id);
            const images = await ImageProductService.findImageProductByProductId(product_id);
            console.log("Image products found:", images);
            return res.status(200).json(images);
        } catch (error) {
            console.error("Error in findImageProductByProductId:", error);
            return res.status(500).json({ message: "Error finding image products" });
        }
    }
}

module.exports = ImageProductController;
