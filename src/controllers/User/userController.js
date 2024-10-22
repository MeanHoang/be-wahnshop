const UserService = require('../../services/user/userService');
const { generateToken } = require('../../utils/tokenUtils');

const registerUser = async (req, res) => {
    try {
        console.log('Check req. body: ', req.body);
        const userData = req.body;

        //check email 
        const isEmailEmpty = await UserService.checkEmail(req.body.email);

        //check phone number
        const isPhoneEmpty = await UserService.checkPhone(req.body.phonenumber);
        console.log('Check isEmpty: ', isEmailEmpty, isPhoneEmpty);
        if (isEmailEmpty || isPhoneEmpty) {
            //create a acc
            const newUser = await UserService.createUser(userData);
            res.status(201).json({ message: 'User registered successfully' });
        }
        else {
            //username is lived
            res.status(202).json({ message: 'Email or phonenumber is used' });
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}


module.exports = {
    registerUser
}