const AdminService = require('../../services/admin/adminService');
const { generateToken } = require('../../utils/tokenUtils');

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
        const admin = await AdminService.loginAdmin(username, password);
        if (admin) {
            //if login success
            // gểnate token and return
            const token = generateToken(admin);
            return res.status(200).json({ message: 'Login successful', token });
        }
        else {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

const getAllAdmin = async (req, res) => {
    const { page = 1, limit = 7, searchTerm = '' } = req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    try {
        const allAdmins = await AdminService.getAllAdmin();

        //filter acdim by username
        const filteredAdmins = allAdmins.filter((admin) =>
            admin.username.toLowerCase().includes(searchTerm.toLowerCase())
        );

        //div page
        const admins = filteredAdmins.slice(startIndex, endIndex);

        res.json({
            total: filteredAdmins.length,
            page,
            admins,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateAdminProfile = async (req, res) => {
    try {
        console.log(">>check req.body: ", req.body);
        const adminId = req.body.id;
        const updateAdmin = await AdminService.updateAdmin(adminId, req.body);
        res.status(200).json({ message: 'Admin profile updated successfully', Admin: updateAdmin });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteAdminProfile = async (req, res) => {
    try {
        console.log(">>>check req.body: ", req.body);
        const adminId = req.body.id;
        await AdminService.deleteAdmin(adminId);
        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

const getAdminProfile = async (req, res) => {
    try {
        console.log(">>>check req.body: ", req.body);
        const adminId = req.body.id;
        const adminProfile = await AdminService.getAdminProfile(adminId);
        res.status(200).json(adminProfile);
    } catch (error) {
        console.error('Error find admin profile:', error.message);
        res.status(404).json({ error: error.message });
    }
};

const searchAdmin = async (req, res) => {
    const { search } = req.query; // Lấy tham số tìm kiếm từ query

    try {
        // Giả sử bạn đã có một hàm tìm kiếm trong model
        const admins = await Admin.findAll({
            where: {
                username: {
                    [Op.like]: `%${search}%`, // Tìm kiếm với LIKE
                },
            },
        });
        res.json({ admins });
    } catch (error) {
        console.error('Error searching admins:', error);
        res.status(500).json({ error: 'Error searching admins' });
    }
};


module.exports = {
    registerAdmin,
    loginAdmin,
    getAllAdmin,
    updateAdminProfile,
    deleteAdminProfile,
    getAdminProfile,
    searchAdmin
}