const Category = require('../../models/Category');

class CategoryService {

    static async createCategory(categoryData) {
        console.log("Service: Creating category with data:", categoryData);
        try {
            return await Category.create(categoryData);
        } catch (error) {
            console.error("Service Error in createCategory:", error);
            throw error;
        }
    }

    static async getAllCategories() {
        console.log("Service: Retrieving all categories");
        try {
            return await Category.getAllCategory();
        } catch (error) {
            console.error("Service Error in getAllCategories:", error);
            throw error;
        }
    }

    static async updateCategory(categoryId, updateData) {
        console.log("Service: Updating category ID:", categoryId, "with data:", updateData);
        try {
            return await Category.update(categoryId, updateData);
        } catch (error) {
            console.error("Service Error in updateCategory:", error);
            throw error;
        }
    }

    static async deleteCategory(categoryId) {
        console.log("Service: Deleting category ID:", categoryId);
        try {
            return await Category.delete(categoryId);
        } catch (error) {
            console.error("Service Error in deleteCategory:", error);
            throw error;
        }
    }

    static async findCategoryById(categoryId) {
        console.log("Service: Finding category by ID:", categoryId);
        try {
            return await Category.findCategoryDetailById(categoryId);
        } catch (error) {
            console.error("Service Error in findCategoryById:", error);
            throw error;
        }
    }

}

module.exports = CategoryService;
