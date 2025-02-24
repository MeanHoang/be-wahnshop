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

const signIn = async (req, res) => {
    console.log('Login user:', req.body);
    try {
        const { email, password } = req.body;
        const user = await UserService.signIn(email, password);

        return res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error in login:', error.message);
        return res.status(401).json({ error: error.message });
    }
}

const getAllUser = async (req, res) => {
    const { page = 1, limit = 7, searchTerm = '' } = req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    try {
        const allUsers = await UserService.getAllUser();

        //filter acdim by username
        const filteredUsers = allUsers.filter((user) =>
            user.fullname.toLowerCase().includes(searchTerm.toLowerCase())
        );

        //div page
        const users = filteredUsers.slice(startIndex, endIndex);

        res.json({
            total: filteredUsers.length,
            page,
            users,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateUserProfile = async (req, res) => {
    try {
        console.log(">>>check req.body: ", req.body);
        const userId = req.body.id;
        const updateUser = await UserService.updateUser(userId, req.body);
        res.status(200).json({ message: 'User profile updated successfully', User: updateUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteUserProfile = async (req, res) => {
    try {
        console.log(">>>check req.body: ", req.body);
        const userId = req.body.id;
        await UserService.deleteUser(userId);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

const getUserProfile = async (req, res) => {
    try {
        const userId = req.body.id;
        const userProfile = await UserService.getUserProfile(userId);

        if (userProfile) {
            return res.status(200).json(userProfile);
        } else {
            return res.status(400).json({ message: 'Not found user' });
        }
    } catch (error) {
        console.error('Error find user profile:', error.message);
        res.status(404).json({ error: error.message });
    }
};


const resetUserPassword = async (req, res) => {
    try {
        console.log(">>> Check req.body: ", req.body);
        const userId = req.body.id;
        await UserService.resetPassword(userId);
        res.status(200).json({ message: 'Password has been reset successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    registerUser,
    getAllUser,
    updateUserProfile,
    deleteUserProfile,
    getUserProfile,
    resetUserPassword,
    signIn
}