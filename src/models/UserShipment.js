const db = require('../config/db');
const bcrypt = require('bcrypt');

class UserShipment {

    //create
    static async create(data) {
        try {
            const dataToInsert = {
                user_id: data.user_id,
                fullname: data.fullname,
                phonenumber: data.phonenumber,
                province: data.province,
                city: data.city,
                district: data.district,
                ward: data.ward,
                note: data.note,
                is_default: data.is_default
            };

            const [result] = await db.promise().query('INSERT INTO user_shipment SET ?', dataToInsert);

            if (result.affectedRows === 0) {
                throw new Error('Shipment creation failed.');
            }

            console.log(">> check result: ", result);
            return { id: result.insertId, ...dataToInsert };
        } catch (error) {
            console.error('Error creating user shipment:', error.message);
            throw new Error('Error creating user shipment');
        }

    }

    //update 
    static async update(shipmentId, updateData) {
        try {
            const [result] = await db.promise().query('UPDATE user_shipment SET ? WHERE id = ?', [updateData, shipmentId]);

            if (result.affectedRows === 0) {
                throw new Error("Update shipment failed!");
            }

            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro updating shipment: ', error.message);
            throw new Error('Error updating shipment');
        }
    }

    //delete
    static async delete(shipmentId) {
        const [result] = await db.promise().query('DELETE FROM user_shipment WHERE id = ?', [shipmentId]);
        return result.affectedRows > 0;
    }

    //get all shipment by ID
    static async findShipmentById(userId) {
        const [rows] = await db.promise().query('SELECT * FROM user_shipment WHERE user_id = ?', [userId]);
        console.log('Query result:', rows);
        return rows;
    }
}

module.exports = UserShipment;
