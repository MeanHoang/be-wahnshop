const db = require('../config/db');

class AttributeOption {

    //create attribute
    static async create(data) {
        try {
            const dataToInsert = {
                name: data.name,
                value: data.value,
                attribute_id: data.attribute_id
            }

            const [result] = await db.promise().query(
                'INSERT INTO attribute_option SET ?',
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
    static async getAllAttributeOption() {
        try {
            const [rows] = await db.promise().query(
                'SELECT * FROM attribute_option'
            );

            return rows;
        } catch (error) {
            console.error("Error in model:", error);
            throw error;
        }
    }

    static async update(attributeOptionId, updateData) {
        try {
            const [result] = await db.promise().query(
                'UPDATE attribute_option SET ? WHERE id = ?',
                [updateData, attributeOptionId]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error in update model:", error);
            throw error;
        }
    }

    static async delete(attributeOptionId) {
        try {
            await db.promise().query('DELETE FROM attribute_option WHERE id = ?',
                [attributeOptionId]);
            return true;
        } catch (error) {
            console.error("Error in delete model:", error);
            throw error;
        }
    }

    static async findAttributeOptionById(attributeOptionId) {
        try {
            const [rows] = await db.promise().query(
                'SELECT * FROM attribute_option WHERE id = ?', [attributeOptionId]);
            return rows[0] || null;
        } catch (error) {
            console.error("Error in model:", error);
            throw error;
        }
    }

    //get AttributeOption by attribute_id
    static async findAttributeOptionByAttributeId(attribute_id) {
        try {

            const [rows] = await db.promise().query(
                'SELECT * FROM attribute_option WHERE attribute_id = ?',
                [attribute_id]
            );

            return rows;
        } catch (error) {
            console.error("Error in model:", error);
            throw error;
        }
    }
}

module.exports = AttributeOption;