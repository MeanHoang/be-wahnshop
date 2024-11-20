const CategoryService = require('../../services/product/categoryServer');

const createCategory = async (req, res) => {
    console.log("Entering createCategory with data:", req.body);
    try {
        const categoryData = req.body;
        const categoryId = await CategoryService.createCategory(categoryData);
        console.log("Category created successfully with ID:", categoryId);
        res.status(201).json({ message: 'Category created successfully', categoryId });
    } catch (error) {
        console.error("Error in createCategory:", error);
        res.status(500).json({ message: 'Failed to create category' });
    }
};

const getAllCategories = async (req, res) => {
    console.log("Entering getAllCategories");
    try {
        const categories = await CategoryService.getAllCategories();
        console.log("Categories retrieved:", categories);
        res.status(200).json(categories);
    } catch (error) {
        console.error("Error in getAllCategories:", error);
        res.status(500).json({ message: 'Failed to retrieve categories' });
    }
};

const updateCategory = async (req, res) => {
    console.log("Entering updateCategory with ID:", req.params.id, "and data:", req.body);
    try {
        const categoryId = req.body.id;
        const updateData = req.body;
        await CategoryService.updateCategory(categoryId, updateData);
        console.log("Category updated successfully for ID:", categoryId);
        res.status(200).json({ message: 'Category updated successfully' });
    } catch (error) {
        console.error("Error in updateCategory:", error);
        res.status(500).json({ message: 'Failed to update category' });
    }
};

const deleteCategory = async (req, res) => {
    console.log("Entering deleteCategory with ID:", req.params.id);
    try {
        const categoryId = req.body.id;
        await CategoryService.deleteCategory(categoryId);
        console.log("Category deleted successfully for ID:", categoryId);
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error("Error in deleteCategory:", error);
        res.status(500).json({ message: 'Failed to delete category' });
    }
};

const getCategoryById = async (req, res) => {
    console.log("Entering getCategoryById with ID:", req.body.id);
    try {
        const categoryId = req.body.id;
        const category = await CategoryService.findCategoryById(categoryId);
        if (category) {
            console.log("Category found:", category);
            res.status(200).json(category);
        } else {
            console.log("Category not found for ID:", categoryId);
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        console.error("Error in getCategoryById:", error);
        res.status(500).json({ message: 'Failed to retrieve category' });
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
    getCategoryById
};
