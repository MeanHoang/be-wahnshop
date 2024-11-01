const Admin = require('../../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key';
const { generateToken } = require('../../utils/tokenUtils');

class AdminService {
    static async createAdmin(adminData) {

        console.log('Creating admin with data: ', adminData);
        try {
            //add new admin
            const newAdmin = await Admin.create(adminData);
            console.log('New acc admin is created with ID: ', newAdmin.id);
            return newAdmin;
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    static async loginAdmin(username, password) {
        console.log('Login with input data to service:', username, password);
        try {
            const admin = await Admin.findAdminByUsername(username);
            console.log('User found:', admin);

            if (!admin) {
                throw new Error('Invalid username or password');
            }

            const isPasswordValid = await bcrypt.compare(password, admin.password);
            if (!isPasswordValid) {
                throw new Error('Invalid username or password');
            }

            // Generate token
            const token = generateToken(admin);
            return { admin, token };
        } catch (error) {
            console.log('Error:', error);
            throw error;
        }
    }

    static async checkUsername(username) {
        console.log('Check username is: ', username);

        //Check username is used
        const admin = await Admin.findAdminByUsername(username);

        if (!admin) {
            console.log('Username is available.');
            return true;
        } else {
            console.log('Username is already in use:', admin);
            return false;
        }
    }

    static async getAllAdmin() {
        console.log('>>>Calling all admin list')
        try {
            const Admins = await Admin.getAllAdmin();
            return Admins;
        } catch (error) {
            console.log(error);
        }
    }

    static async getAdminDetail(adminId) {
        console.log('Find detail for admin Id: ', adminId);
        const adminDetail = await Admin.findAdminById(adminId);
        if (!adminDetail) throw new Error('User not found');
        return adminDetail;
    }

    static async updateAdmin(adminId, updateData) {
        console.log(">>> Update in admin id: ", adminId);
        try {
            const updateAdmin = await Admin.update(adminId, updateData);
            if (!updateAdmin) throw new Error('Update failed');
            return updateAdmin;
        } catch (error) {
            console.log("Error in Service: ", error)
        }
    }

    static async deleteAdmin(adminId) {
        console.log(">>>Deleting in service with id: ", adminId);
        try {
            const deleted = await Admin.delete(adminId);
            if (!deleted) throw new Error('Delete failed');
            return deleted;
        } catch (error) {
            console.log("Error in Service: ", error)
        }
    }

    static async getAdminProfile(adminId) {
        console.log('Find profile for admin ID:', adminId);
        try {
            const adminProfile = await Admin.findAdminById(adminId);
            if (!adminProfile) throw new Error('Admin not found');
            return adminProfile;
        } catch (error) {
            console.log("Error in Service: ", error)
        }
    }

    static async searchAdminByUsername(partialUsername, page = 1, limit = 10) {
        try {
            const admins = await Admin.searchAdminByUsername(partialUsername, page, limit);
            return admins;
        } catch (error) {
            console.error('Error finding admins by username:', error.message);
            throw new Error('Error finding admins');
        }
    }

    static async countAdminsByUsername(partialUsername) {
        try {
            const totalAdmins = await Admin.countAdminsByUsername(partialUsername);
            return totalAdmins;
        } catch (error) {
            console.error('Error counting admins:', error.message);
            throw new Error('Error counting admins');
        }
    }

    static async resetPasswordAdmin(adminId) {
        console.log('Resetting password for admin ID:', adminId);
        try {
            const reset = await Admin.resetPassword(adminId);
            if (!reset) throw new Error('Password reset failed');
            console.log('Password reset successful for admin ID:', adminId);
            return { message: 'Password has been reset to default value.' };
        } catch (error) {
            console.log("Error in Service (resetPasswordAdmin):", error);
            throw error;
        }
    }


}

module.exports = AdminService;