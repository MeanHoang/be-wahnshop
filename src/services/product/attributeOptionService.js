const AttributeOption = require('../../models/AtributeOption');

class AtributeOptionService {

    static async createAtributeOption(data) {
        console.log("check data to create service: ", data);

        try {
            return await AttributeOption.create(data);
        } catch (error) {
            console.error("Service Error: ", error);
            throw error;
        }
    }


    static async getAllAtributeOption() {
        try {
            return await AttributeOption.getAllAttributeOption();
        } catch (error) {
            console.error("Service Error:", error);
            throw error;
        }
    }


    static async updateAttributeOption(attributeOptionId, updataData) {
        console.log("check data to update at service: ", updataData);

        try {
            return await AttributeOption.update(attributeOptionId, updataData);
        } catch (error) {
            console.error("Service Error in updateAttributeOption:", error);
            throw error;
        }
    }

    static async deleteAttributeOption(attributeOptionId) {
        console.log("check delete attribute option in service with id: ", attributeOptionId);

        try {
            return await AttributeOption.delete(attributeOptionId);
        } catch (error) {
            console.error("Service Error in deleteAttributeOption:", error);
            throw error;
        }
    }

    static async findAttributeOptionById(attributeOptionId) {
        console.log("Service: Finding attributeOption by ID:", attributeOptionId);
        try {
            return await AttributeOption.findAttributeOptionById(attributeOptionId);
        } catch (error) {
            console.error("Service Error:", error);
            throw error;
        }
    }

    static async findAttributeOptionByAttributeId(attribute_id) {
        try {
            console.log("check attri id: ", attribute_id);
            return await AttributeOption.findAttributeOptionByAttributeId(attribute_id);
        } catch (error) {
            console.error("Service Error:", error);
            throw error;
        }
    }

}

module.exports = AtributeOptionService;