const db = require('../config/db');
const bcrypt = require('bcrypt');
require('dotenv').config();

class User {
    // Create a user (bao gồm cả Google User)
    static async create(userData) {
        try {
            let userToInsert = {
                email: userData.email,
                phonenumber: userData.phonenumber || null,
                password: userData.password ? await bcrypt.hash(userData.password, 10) : null,
                fullname: userData.fullname,
                sex: userData.sex || null,
                birthday: userData.birthday || null,
                height: userData.height || null,
                weight: userData.weight || null,
            };

            const [result] = await db.promise().query('INSERT INTO user SET ?', userToInsert);

            if (result.affectedRows === 0) {
                throw new Error('User creation failed.');
            }

            console.log(">> check result: ", result);
            return { id: result.insertId, ...userToInsert };
        } catch (error) {
            console.error('Error creating user:', error.message);
            throw new Error('Error creating user');
        }
    }

    // Login (Hỗ trợ cả Google Login)
    static async signIn(email, password, googleId = null) {
        try {
            let query, params;

            if (googleId) {
                query = 'SELECT * FROM user WHERE email = ? AND googleId = ? AND is_active = 1';
                params = [email, googleId];
            } else {
                query = 'SELECT * FROM user WHERE email = ? AND is_active = 1';
                params = [email];
            }

            const [rows] = await db.promise().query(query, params);

            if (!rows.length) return null;

            const user = rows[0];

            if (!googleId && password) {
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) return null;
            }

            return user;
        } catch (error) {
            console.error('Error in signIn:', error.message);
            throw new Error('Error in signIn');
        }
    }

    // Find or create Google User
    static async findOrCreateGoogleUser(email, fullname, googleId, avatar) {
        try {
            const [user] = await db.promise().query("SELECT * FROM user WHERE email=?", [email]);

            if (user.length > 0) {
                return user[0]; // Nếu user đã tồn tại, trả về user
            }

            // Nếu user chưa tồn tại, tạo mới
            const newUser = await User.create({
                email,
                fullname,
                googleId,
                avatar,
            });

            return newUser;
        } catch (error) {
            console.error('Error in findOrCreateGoogleUser:', error.message);
            throw new Error('Error in findOrCreateGoogleUser');
        }
    }

    // Tìm người dùng bằng email
    static async findUserByEmail(email) {
        try {
            const [user] = await db.promise().query("SELECT * FROM user WHERE email=?", [email]);
            return user.length > 0 ? user[0] : null;
        } catch (error) {
            console.error('Error in findUserByEmail:', error.message);
            throw new Error('Error in findUserByEmail');
        }
    }

    // Tìm người dùng bằng số điện thoại
    static async findUserByPhone(phonenumber) {
        try {
            const [user] = await db.promise().query("SELECT * FROM user WHERE phonenumber=?", [phonenumber]);
            return user.length > 0 ? user[0] : null;
        } catch (error) {
            console.error('Error in findUserByPhone:', error.message);
            throw new Error('Error in findUserByPhone');
        }
    }

    // Lấy tất cả người dùng
    static async getAllUser() {
        try {
            const [rows] = await db.promise().query("SELECT * FROM user ORDER BY id DESC;");
            return rows;
        } catch (error) {
            console.error('Error in getAllUser:', error.message);
            throw new Error('Error in getAllUser');
        }
    }

    // Cập nhật thông tin người dùng
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
            console.error('Error updating user:', error.message);
            throw new Error('Error updating user profile');
        }
    }

    // Xóa người dùng
    static async delete(userId) {
        try {
            const [result] = await db.promise().query('DELETE FROM user WHERE id = ?', [userId]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error deleting user:', error.message);
            throw new Error('Error deleting user');
        }
    }

    // Tìm người dùng theo ID
    static async findUserById(userId) {
        try {
            const [rows] = await db.promise().query('SELECT * FROM user WHERE id = ?', [userId]);
            return rows[0];
        } catch (error) {
            console.error('Error in findUserById:', error.message);
            throw new Error('Error in findUserById');
        }
    }

    // Reset mật khẩu người dùng
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
