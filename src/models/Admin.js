const db = require('../config/db');
const bcrypt = require('bcrypt');

class Admin {
    //Create a acc admin
    static async create(adminData) {
        try {
            // hash password
            const hashedPassword = await bcrypt.hash(adminData.password, 10);
            const adminToInsert = {
                username: adminData.username,
                password: hashedPassword,
                fullname: adminData.fullname
            };

            const [result] = await db.promise().query('INSERT INTO admin SET ?', adminToInsert);

            if (result.affectedRows === 0) {
                throw new Error('Admin creation failed.');
            }

            console.log(">> check result: ", result);
            return { id: result.insertId, ...adminToInsert };
        } catch (error) {
            console.error('Error creating admin acc:', error.message);
            throw new Error('Error creating admin acc'); // Ném lại lỗi cho controller xử lý
        }
    }

    //Login
    static async login(username, password) {
        const [rows] = await db.promise().query('SELECT * FROM admin WHERE username = ? AND password = ?', [username, password]);
        return rows[0];
    }

    //find  return 1 result
    static async findAdminByUsername(username) {
        const [rows] = await db.promise().query('SELECT * FROM admin WHERE username =?', [username]);
        console.log('Query result:', rows);
        return rows.length > 0 ? rows[0] : null;
    }

}

module.exports = Admin;
