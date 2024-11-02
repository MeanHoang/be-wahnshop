const db = require('../config/db');

class Category {
    static async create(categoryData) {
        try {
            const dataToInsert = {
                name: categoryData.name,
                description: categoryData.description,
            };

            const [result] = await db.promise().query(
                'INSERT INTO category (name, description) VALUES (?, ?)',
                [dataToInsert.name, dataToInsert.description]
            );
            return result.insertId;
        } catch (error) {
            console.error("Error in create category:", error);
            throw error;
        }
    }

    static async getAllCategory() {
        try {
            const [rows] = await db.promise().query('SELECT * FROM category');
            return rows;
        } catch (error) {
            console.error("Error in getAllCategory:", error);
            throw error;
        }
    }

    static async update(categoryId, updateData) {
        try {
            const { name, description } = updateData;
            await db.promise().query(
                'UPDATE category SET name = ?, description = ? WHERE id = ?',
                [name, description, categoryId]
            );
            return true;
        } catch (error) {
            console.error("Error in update category:", error);
            throw error;
        }
    }

    static async delete(categoryId) {
        try {
            await db.promise().query('DELETE FROM category WHERE id = ?', [categoryId]);
            return true;
        } catch (error) {
            console.error("Error in delete category:", error);
            throw error;
        }
    }

    static async findCategoryDetailById(categoryId) {
        try {
            const [rows] = await db.promise().query('SELECT * FROM category WHERE id = ?', [categoryId]);
            return rows[0] || null;
        } catch (error) {
            console.error("Error in findCategoryDetailById:", error);
            throw error;
        }
    }
}

module.exports = Category;
