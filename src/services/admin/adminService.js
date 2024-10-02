const Admin = require('../../models/Admin');
const bcrypt = require('bcrypt');

class AdminService {
    static async createAdmin(adminData) {

        console.log('Creating user with data: ', adminData);
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
        console.log('Login with input data to service: ', username, password);
        try {
            //Find data input to db
            const admin = await Admin.findAdminByUsername(username);
            console.log('User found: ', admin);

            //if not found
            if (!admin) {
                throw new Error('Invalid username or password');
            }

            //Print Pass input
            console.log('Password entered:', password);
            //Print Pass in db
            console.log('Stored hashed password:', admin.password);

            const isPasswordValid = await bcrypt.compare(password, admin.password);
            if (!isPasswordValid) {
                throw new Error('Invalid username or password');
            }

            return admin;
        } catch (error) {
            console.log('Error: ', error);
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
}

module.exports = AdminService;