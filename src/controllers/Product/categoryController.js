const CategoryService = require('../../services/product/categoryService');

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
    console.log('Get All Category Request:', req.query);
    const { page = 1, limit = 7, searchTerm = '' } = req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    try {
        const allCategories = await CategoryService.getAllCategories();

        const filteredCategories = allCategories.filter((category) =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Divide page
        const categories = filteredCategories.slice(startIndex, endIndex);
        console.log('Filtered Categories:', filteredCategories.length, 'Page:',
            page, 'Categories on Page:', categories.length);
        res.json({
            total: filteredCategories.length,
            page,
            categories,
        });
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

const getAllCategoryActive = async (req, res) => {
    try {
        const categories = await CategoryService.getAllCategoryActive();
        return res.status(200).json({
            success: true,
            message: "Lấy danh sách danh mục thành công!",
            categories: categories
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Lỗi server. Không thể lấy danh mục!"
        });
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
    getCategoryById,
    getAllCategoryActive
};
