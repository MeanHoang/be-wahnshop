const Attribute = require('../../models/Atribute');

class AttributeService {

    static async createAttribute(attributeData) {
        console.log("Service: Creating attribute with data:", attributeData);
        try {
            return await Attribute.create(attributeData);
        } catch (error) {
            console.error("Service Error in createAttribute:", error);
            throw error;
        }
    }

    static async getAllAttribute() {
        console.log("Service: Retrieving all categories");
        try {
            return await Attribute.getAllAttribute();
        } catch (error) {
            console.error("Service Error:", error);
            throw error;
        }
    }

    static async updateAttribute(attributeId, updateData) {
        console.log("Service: Updating attribute ID:", attributeId, "with data:", updateData);
        try {
            return await Attribute.update(attributeId, updateData);
        } catch (error) {
            console.error("Service Error in updateAttribute:", error);
            throw error;
        }
    }

    static async deleteAttribute(attributeId) {
        console.log("Service: Deleting attribute ID:", attributeId);
        try {
            return await Attribute.delete(attributeId);
        } catch (error) {
            console.error("Service Error in deleteAttribute:", error);
            throw error;
        }
    }

    static async findAttributeById(attributeId) {
        console.log("Service: Finding attribute by ID:", attributeId);
        try {
            return await Attribute.findAttributeDetailById(attributeId);
        } catch (error) {
            console.error("Service Error in findAttributeById:", error);
            throw error;
        }
    }

}

module.exports = AttributeService;
