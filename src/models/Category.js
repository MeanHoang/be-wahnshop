const db = require('../config/db');

class Category {
    static async create(categoryData) {
        try {
            const dataToInsert = {
                name: categoryData.name,
                description: categoryData.description
            };

            const [result] = await db.promise().query(
                'INSERT INTO category SET ?',
                dataToInsert
            );

            if (result.affectedRows === 0) {
                throw new Error('Category creation failed!');
            }
            console.log(">> check result: ", result);

            return { id: result.insertId, ...dataToInsert };
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
            const [result] = await db.promise().query(
                'UPDATE category SET ? WHERE id = ?',
                [updateData, categoryId]
            );
            return result.affectedRows > 0;
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
