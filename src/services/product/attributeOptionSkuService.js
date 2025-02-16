const AttributeOptionSku = require('../../models/AttributeOptionSku');

class AttributeOptionSkuService {
    static async createAttributeOptionSku(data) {
        try {
            return await AttributeOptionSku.create(data);
        } catch (error) {
            throw new Error(`Error creating AttributeOptionSku: ${error.message}`);
        }
    }

    static async updateAttributeOptionSku(skuId, updateData) {
        try {
            return await AttributeOptionSku.update(skuId, updateData);
        } catch (error) {
            throw new Error(`Error updating AttributeOptionSku: ${error.message}`);
        }
    }

    static async deleteAttributeOptionSku(sku_id, attribute_option_id) {
        try {
            return await AttributeOptionSku.delete(sku_id, attribute_option_id);
        } catch (error) {
            throw new Error(`Error deleting AttributeOptionSku: ${error.message}`);
        }
    }

    static async getAllAttributeOptionSkus() {
        try {
            return await AttributeOptionSku.getAllAttributeOptionSku();
        } catch (error) {
            throw new Error(`Error fetching AttributeOptionSkus: ${error.message}`);
        }
    }

    static async getAttributeOptionSkuById(skuId) {
        try {
            return await AttributeOptionSku.getAttributeOptionSkuById(skuId);
        } catch (error) {
            throw new Error(`Error fetching AttributeOptionSku by ID: ${error.message}`);
        }
    }
}

module.exports = AttributeOptionSkuService;
