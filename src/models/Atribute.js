const db = require('../config/db');

class Attribute {

    //create attribute
    static async create(data) {
        try {
            const dataToInsert = {
                name: data.name,
                slug: data.slug
            }

            const [result] = await db.promise().query(
                'INSERT INTO attribute SET ?',
                dataToInsert
            );

            if (result.affectedRows === 0) {
                throw new Error('Create failed!');
            }

            console.log("check result: ", result);

            return { id: result.insertId, ...dataToInsert };
        } catch (error) {
            console.error("Error in model:", error);
            throw error;
        }
    }

    //get all
    static async getAllAttribute() {
        try {
            const [rows] = await db.promise().query(
                'SELECT * FROM attribute'
            );

            return rows;
        } catch (error) {
            console.error("Error in model:", error);
            throw error;
        }
    }

    static async update(attributeId, updateData) {
        try {
            const [result] = await db.promise().query(
                'UPDATE attribute SET ? WHERE id = ?',
                [updateData, attributeId]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error in update model:", error);
            throw error;
        }
    }

    static async delete(attributeId) {
        try {
            await db.promise().query('DELETE FROM attribute WHERE id = ?',
                [attributeId]);
            return true;
        } catch (error) {
            console.error("Error in delete model:", error);
            throw error;
        }
    }

    static async findAttributeDetailById(attributeId) {
        try {
            const [rows] = await db.promise().query(
                'SELECT * FROM attribute WHERE id = ?', [attributeId]);
            return rows[0] || null;
        } catch (error) {
            console.error("Error in model:", error);
            throw error;
        }
    }
}

module.exports = Attribute;