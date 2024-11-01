const UserShipment = require("../../models/UserShipment");

class UserShipmentService {

    // Create a new shipment
    static async create(data) {
        try {
            const shipment = await UserShipment.create(data);
            return shipment;
        } catch (error) {
            console.error('Error in UserShipmentService.create:', error.message);
            throw new Error('Failed to create shipment');
        }
    }

    // Update an existing shipment
    static async update(shipmentId, updateData) {
        try {
            const updated = await UserShipment.update(shipmentId, updateData);
            if (!updated) {
                throw new Error("Shipment not found or update failed.");
            }
            return updated;
        } catch (error) {
            console.error('Error in UserShipmentService.update:', error.message);
            throw new Error('Failed to update shipment');
        }
    }

    // Delete a shipment by ID
    static async delete(shipmentId) {
        try {
            const deleted = await UserShipment.delete(shipmentId);
            if (!deleted) {
                throw new Error("Shipment not found or delete failed.");
            }
            return deleted;
        } catch (error) {
            console.error('Error in UserShipmentService.delete:', error.message);
            throw new Error('Failed to delete shipment');
        }
    }

    // Find shipments by user ID
    static async findShipmentByUserId(userId) {
        try {
            const shipments = await UserShipment.findShipmentById(userId);
            if (!shipments || shipments.length === 0) {
                return [];
            }
            return shipments;
        } catch (error) {
            console.error('Error in UserShipmentService.findShipmentByUserId:', error.message);
            throw new Error('Failed to retrieve shipments');
        }
    }
}

module.exports = UserShipmentService;
