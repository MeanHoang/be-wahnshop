const db = require('../config/db');
const bcrypt = require('bcrypt');
require('dotenv').config();

class User {
    //Create a acc user
    static async create(userData) {
        try {
            // hash password
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const userToInsert = {
                email: userData.email,
                phonenumber: userData.phonenumber,
                password: hashedPassword,
                fullname: userData.fullname,
                sex: userData.sex,
                birthday: userData.birthday,
                height: userData.height,
                weight: userData.weight,
            };

            const [result] = await db.promise().query('INSERT INTO user SET ?', userToInsert);

            if (result.affectedRows === 0) {
                throw new Error('User creation failed.');
            }

            console.log(">> check result: ", result);
            return { id: result.insertId, ...userToInsert };
        } catch (error) {
            console.error('Error creating user acc:', error.message);
            throw new Error('Error creating user acc'); // Ném lại lỗi cho controller xử lý
        }
    }

    //Find user by email 
    static async findUserByEmail(email) {
        try {
            const [user] = await db.promise().query("SELECT * FROM user WHERE email=?", [email])
            console.log('Query result: ', user);
            return user.length > 0 ? user[0] : null;
        } catch (error) {
            console.log('>>>Error findbyEmail in model: ', error);
        }
    }

    //Find user by phonenumber
    static async findUserByPhone(phonenumber) {
        try {
            const [user] = await db.promise().query("SELECT * FROM user WHERE phonenumber=?", [phonenumber])
            console.log('Query result: ', user);
            return user.length > 0 ? user[0] : null;
        } catch (error) {
            console.log('>>>Error findbyPhoneNB in model: ', error);
        }
    }

    //get all user
    static async getAllUser() {
        try {
            const [rows] = await db.promise().query("SELECT * FROM user ORDER BY id DESC;");
            console.log("Query get all user");
            return rows;
        } catch (error) {
            console.log('>>>Error get all in model: ', error);
        }
    }

    //update user
    static async update(userId, updateData) {
        try {
            if (updateData.password) {
                updateData.password = await bcrypt.hash(updateData.password, 10);
            }

            const [result] = await db.promise().query('UPDATE user SET ? WHERE id = ?', [updateData, userId]);

            if (result.affectedRows === 0) {
                throw new Error('User update failed');
            }

            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error updating admin:', error.message);
            throw new Error('Error updating admin profile');
        }
    }

    //delete
    static async delete(userId) {
        const [result] = await db.promise().query('DELETE FROM user WHERE id = ?', [userId]);
        return result.affectedRows > 0;
    }

    //Find one by ID
    static async findUserById(userId) {
        console.log("find one by id");
        const [rows] = await db.promise().query('SELECT * FROM user WHERE id = ?', [userId]);
        return rows[0];
    }

    static async resetPassword(userId) {
        try {
            const newPassword = process.env.DEFAUlL_PASS_USER;
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            const [result] = await db.promise().query('UPDATE user SET password = ? WHERE id = ?', [hashedPassword, userId]);

            if (result.affectedRows === 0) {
                throw new Error('Password reset failed. User may not exist.');
            }

            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error resetting password:', error.message);
            throw new Error('Error resetting password');
        }
    }

}

module.exports = User;
