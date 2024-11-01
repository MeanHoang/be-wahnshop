const UserShipmentService = require('../../services/user/userShipmentService');

const createShipment = async (req, res) => {
    try {
        const shipmentData = req.body;
        console.log(">>> check req.body: ", req.body);
        const newShipment = await UserShipmentService.create(shipmentData);
        res.status(201).json({ message: 'Shipment created successfully', shipment: newShipment });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateShipment = async (req, res) => {
    try {
        const shipmentId = req.body.id;
        const updateData = req.body;

        console.log(">>> check req.body: ", req.body);
        console.log(">>>check shipmentId", shipmentId);
        const updated = await UserShipmentService.update(shipmentId, updateData);
        if (updated) {
            res.status(200).json({ message: 'Shipment updated successfully' });
        } else {
            res.status(404).json({ message: 'Shipment not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteShipment = async (req, res) => {
    try {
        const shipmentId = req.body.id;
        console.log(">>>check req.body: ", req.body);
        console.log(">>>check shipment Id: ".shipmentId);
        const deleted = await UserShipmentService.delete(shipmentId);
        if (deleted) {
            res.status(200).json({ message: 'Shipment deleted successfully' });
        } else {
            res.status(404).json({ message: 'Shipment not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getUserShipments = async (req, res) => {
    try {
        const userId = req.body.user_id;
        console.log(">>>check shipment with user_id: ", userId);
        const shipments = await UserShipmentService.findShipmentByUserId(userId);
        res.status(200).json(shipments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createShipment,
    updateShipment,
    deleteShipment,
    getUserShipments,
};
