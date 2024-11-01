const AdminService = require('../../services/admin/adminService');
const { generateToken } = require('../../utils/tokenUtils');

const registerAdmin = async (req, res) => {
    console.log('Register Admin Request:', req.body);
    try {
        const adminData = req.body;

        // Check username
        const isEmpty = await AdminService.checkUsername(req.body.username);
        console.log('Is username available:', isEmpty);

        if (isEmpty) {
            // Create an account
            const newAdmin = await AdminService.createAdmin(adminData);
            console.log('New Admin Created:', newAdmin);
            return res.status(201).json({ message: 'Admin registered successfully' });
        } else {
            // Username is already in use
            return res.status(202).json({ message: 'Username is used' });
        }
    } catch (error) {
        console.error('Error in registerAdmin:', error.message);
        return res.status(400).json({ error: error.message });
    }
}

const loginAdmin = async (req, res) => {
    console.log('Login Admin Request:', req.body);
    try {
        const { username, password } = req.body;
        const { admin, token } = await AdminService.loginAdmin(username, password);

        console.log('Login successful, Token:', token);
        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error in loginAdmin:', error.message);
        return res.status(401).json({ error: error.message });
    }
}

const getAllAdmin = async (req, res) => {
    console.log('Get All Admin Request:', req.query);
    const { page = 1, limit = 7, searchTerm = '' } = req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    try {
        const allAdmins = await AdminService.getAllAdmin(); // Get all admins from your DB
        console.log('All Admins:', allAdmins);

        // Filter admin by username
        const filteredAdmins = allAdmins.filter((admin) =>
            admin.username.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Divide page
        const admins = filteredAdmins.slice(startIndex, endIndex);
        console.log('Filtered Admins:', filteredAdmins.length, 'Page:', page, 'Admins on Page:', admins.length);

        res.json({
            total: filteredAdmins.length,
            page,
            admins,
        });
    } catch (error) {
        console.error('Error in getAllAdmin:', error.message);
        res.status(500).json({ error: error.message });
    }
}

const updateAdminProfile = async (req, res) => {
    console.log('Update Admin Profile Request:', req.body);
    try {
        const adminId = req.body.id;
        const updateAdmin = await AdminService.updateAdmin(adminId, req.body); // Implement this method in your service
        console.log('Admin Profile Updated:', updateAdmin);
        res.status(200).json({ message: 'Admin profile updated successfully', Admin: updateAdmin });
    } catch (error) {
        console.error('Error in updateAdminProfile:', error.message);
        res.status(400).json({ error: error.message });
    }
}

const deleteAdminProfile = async (req, res) => {
    console.log('Delete Admin Profile Request:', req.body);
    try {
        const adminId = req.body.id;
        await AdminService.deleteAdmin(adminId); // Implement this method in your service
        console.log('Admin Deleted:', adminId);
        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        console.error('Error in deleteAdminProfile:', error.message);
        res.status(404).json({ error: error.message });
    }
}

const getAdminProfile = async (req, res) => {
    console.log('Get Admin Profile Request:', req.body);
    try {
        const adminId = req.body.id;
        const adminProfile = await AdminService.getAdminProfile(adminId); // Implement this method in your service
        console.log('Admin Profile:', adminProfile);
        res.status(200).json(adminProfile);
    } catch (error) {
        console.error('Error finding admin profile:', error.message);
        res.status(404).json({ error: error.message });
    }
};

const searchAdmin = async (req, res) => {
    console.log('Search Admin Request:', req.query);
    const { search } = req.query; // Get search term from query

    try {
        const admins = await AdminService.searchAdminByUsername(search); // Implement this method in your service
        console.log('Search Results:', admins);
        res.json({ admins });
    } catch (error) {
        console.error('Error searching admins:', error);
        res.status(500).json({ error: 'Error searching admins' });
    }
};

const resetPasswordAdmin = async (req, res) => {
    console.log('Reset Password Admin Request:', req.body);

    try {
        const adminId = req.body.id;

        const resetResult = await AdminService.resetPasswordAdmin(adminId);
        console.log('Password reset successful for admin ID:', adminId);

        res.status(200).json(resetResult);
    } catch (error) {
        console.error('Error resetting password for admin:', error.message);
        res.status(400).json({ error: error.message });
    }
};


module.exports = {
    registerAdmin,
    loginAdmin,
    getAllAdmin,
    updateAdminProfile,
    deleteAdminProfile,
    getAdminProfile,
    searchAdmin,
    resetPasswordAdmin
}
