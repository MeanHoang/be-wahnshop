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
        const [rows] = await db.promise().query('SELECT * FROM admin WHERE username = ? AND password = ? AND is_active= 1', [username, password]);
        return rows[0];
    }

    //find  return 1 rows
    static async findAdminByUsername(username) {
        const [rows] = await db.promise().query('SELECT * FROM admin WHERE username =? AND is_active=1', [username]);
        console.log('Query result:', rows);
        return rows.length > 0 ? rows[0] : null;
    }

    //get all acc admins
    static async getAllAdmin() {
        console.log("get all acc admins");
        const [rows] = await db.promise().query('SELECT * FROM admin ORDER BY id DESC');
        return rows;
    }

    //Find one by ID
    static async findAdminById(adminId) {
        console.log("find one by id");
        const [rows] = await db.promise().query('SELECT * FROM admin WHERE id = ?', [adminId]);
        return rows[0];
    }

    //Update admin
    static async update(adminId, updateData) {
        try {
            if (updateData.password) {
                updateData.password = await bcrypt.hash(updateData.password, 10);
            }

            const [result] = await db.promise().query('UPDATE admin SET ? WHERE id = ?', [updateData, adminId]);

            if (result.affectedRows === 0) {
                throw new Error('Admin update failed.');
            }

            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error updating admin:', error.message);
            throw new Error('Error updating admin profile');
        }
    }

    //delete admin
    static async delete(adminId) {
        const [result] = await db.promise().query('DELETE FROM admin WHERE id = ?', [adminId]);
        return result.affectedRows > 0;
    }

    //Search 
    static async searchAdminByUsername(partialUsername, page = 1, limit = 10) {
        try {
            const offset = (page - 1) * limit;

            // Sửa lại cú pháp LIMIT và OFFSET
            const [rows] = await db.promise().query(
                'SELECT * FROM admin WHERE username LIKE ? LIMIT ? OFFSET ?',
                [`%${partialUsername}%`, parseInt(limit), parseInt(offset)]
            );

            return rows;
        } catch (error) {
            console.error('Error searching admins by partial username:', error.message);
            throw new Error('Error searching admins');
        }
    }

    static async countAdminsByUsername(partialUsername) {
        try {
            const [rows] = await db.promise().query(
                `SELECT COUNT(*) as total FROM admin WHERE username LIKE ?`,
                [`%${partialUsername}%`]
            );

            return rows[0].total; // Trả về tổng số admin tìm được
        } catch (error) {
            console.error('Error counting admins by partial username:', error.message);
            throw new Error('Error counting admins');
        }
    }

}

module.exports = Admin;
