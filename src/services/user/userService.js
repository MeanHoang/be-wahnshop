const bcrypt = require('bcrypt');
const User = require('../../models/User');

class UserService {
    static async createUser(userData) {

        console.log('Creating user with data: ', userData);
        try {
            //add new admin
            const newUser = await User.create(userData);
            console.log('New acc user is created with ID: ', newUser.id);
            return newUser;
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    static async checkEmail(email) {
        console.log('Check email is: ', email);

        //Check email is used
        const user = await User.findUserByEmail(email)

        if (!user) {
            console.log('Email is available.');
            return true;
        } else {
            console.log('Email is already in use:', user);
            return false;
        }
    }

    static async checkPhone(phonenumber) {
        console.log('Check phonenumber is: ', phonenumber);

        //Check email is used
        const user = await User.findUserByPhone(phonenumber)

        if (!user) {
            console.log('Phonenumber is available.');
            return true;
        } else {
            console.log('Phonenumber is already in use:', user);
            return false;
        }
    }

    static async getAllUser() {
        console.log('>>>Calling all admin list')
        try {
            const Users = await User.getAllUser();
            return Users;
        } catch (error) {
            console.log(error);
        }
    }

    static async updateUser(userId, updateData) {
        console.log(">>> Update in user id: ", userId);
        try {
            const updateUser = await User.update(userId, updateData);
            if (!updateUser) throw new Error('Update failed');
            return updateUser;
        } catch (error) {
            console.log("Error in Service: ", error)
        }
    }

    static async deleteUser(userId) {
        console.log(">>>Deleting in service with id: ", userId)
        try {
            const deleted = await User.delete(userId);
            if (!deleted) throw new Error('Delete failed');
            return deleted;
        } catch (error) {
            console.log("Error in Service: ", error)
        }
    }

    static async getUserProfile(userId) {
        console.log('Find profile for user ID:', userId);
        try {
            const userProfile = await User.findUserById(userId);
            if (!userProfile) throw new Error('Admin not found');
            return userProfile;
        } catch (error) {
            console.log("Error in Service: ", error)
        }
    }

    static async resetPassword(userId) {
        console.log("Resetting password for user ID:", userId);
        try {
            const result = await User.resetPassword(userId);
            if (!result) throw new Error('Password reset failed.');

            console.log("Password reset successfully for user ID:", userId);
            return result;
        } catch (error) {
            console.log("Error in Service:", error);
            throw new Error('Error resetting password');
        }
    }

    static async signIn(email, password) {
        console.log('Login with input data to service:', email, password);
        try {
            const user = await User.findUserByEmail(email);
            console.log('User found:', user);

            if (!user) {
                throw new Error('Invalid username or password');
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid username or password');
            }

            return user;
        } catch (error) {
            console.log('Error:', error);
            throw error;
        }
    }

}
module.exports = UserService;
