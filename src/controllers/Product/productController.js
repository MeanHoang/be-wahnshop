const ProductService = require('../../services/product/productService');
const { generateToken } = require('../../utils/tokenUtils');

const createProduct = async (req, res) => {
    try {
        const productData = req.body;
        const productId = await ProductService.createProduct(productData);
        res.status(201).json({ message: 'Product created successfully', productId });
    } catch (error) {
        console.error("Error in createProduct:", error);
        res.status(500).json({ message: 'Failed to create product', error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const productId = req.body.id;
        const updateData = req.body;
        await ProductService.updateProduct(productId, updateData);
        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error("Error in updateProduct:", error);
        res.status(500).json({ message: 'Failed to update product', error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.body.id;
        await ProductService.deleteProduct(productId);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error("Error in deleteProduct:", error);
        res.status(500).json({ message: 'Failed to delete product', error: error.message });
    }
};

const getAllProduct = async (req, res) => {
    try {
        const products = await ProductService.getAllProduct();
        res.status(200).json(products);
    } catch (error) {
        console.error("Error in getAllProduct:", error);
        res.status(500).json({ message: 'Failed to retrieve products', error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const productId = req.body.id;
        const product = await ProductService.getProductById(productId);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error("Error in getProductById:", error);
        res.status(500).json({ message: 'Failed to retrieve product', error: error.message });
    }
};

const getProductByCategory = async (req, res) => {
    try {
        const categoryId = req.body.categoryId;
        const products = await ProductService.getProductByCategory(categoryId);
        res.status(200).json(products);
    } catch (error) {
        console.error("Error in getProductByCategory:", error);
        res.status(500).json({ message: 'Failed to retrieve products by category', error: error.message });
    }
};

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getProductById,
    getProductByCategory
};
