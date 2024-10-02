const AdminService = require('../../services/admin/adminService');

const registerAdmin = async (req, res) => {
    try {
        console.log('Check req. body: ', req.body);
        const adminData = req.body;

        //check username 
        const isEmpty = await AdminService.checkUsername(req.body.username);

        console.log('Check isEmpty: ', isEmpty);
        if (isEmpty) {
            //create a acc
            const newAdmin = await AdminService.createAdmin(adminData);
            res.status(201).json({ message: 'Admin registered successfully' });
        }
        else {
            //username is lived
            res.status(202).json({ message: 'Username is used' });
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await AdminService.loginAdmin(username, password);
        if (user) {
            //if login success
            return res.json({ message: 'Login successful', user });
        }
        else {
            return res.json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

module.exports = {
    registerAdmin,
    loginAdmin
}