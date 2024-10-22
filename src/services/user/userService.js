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
}
module.exports = UserService;
