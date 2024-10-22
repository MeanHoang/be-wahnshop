const db = require('../config/db');
const bcrypt = require('bcrypt');

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
                fullname: userData.fullname
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
            const [rows] = await db.promise().query("SELECT * FROM user DESC");
            console.log("Query get all user");
            return rows;
        } catch (error) {
            console.log('>>>Error get all in model: ', error);
        }
    }

}

module.exports = User;
