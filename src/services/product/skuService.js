const Sku = require('../../models/Sku');

class SkuService {

    static async createSku(skuData) {
        try {
            const skuId = await Sku.create(skuData);

            console.log("Sku created with ID:", skuId);
            return skuId;
        } catch (error) {
            console.error("Error in SkuService - createSku:", error);
            throw error;
        }
    }

    static async getAllSku() {
        try {
            const skus = await Sku.getAllSku();
            console.log("Retrieved all skus");
            return skus;
        } catch (error) {
            console.error("Error in SkuService - getAllSku:", error);
            throw error;
        }
    }

    static async getSkuById(skuId) {
        try {
            const sku = await Sku.getSkuById(skuId);
            console.log(`Retrieved sku with ID ${skuId}`);
            return sku;
        } catch (error) {
            console.error(`Error in SkuService - getSkuById for ID ${skuId}:`, error);
            throw error;
        }
    }

    static async updateSku(skuId, updateData) {
        try {
            await Sku.update(skuId, updateData);
            console.log(`Sku with ID ${skuId} updated`);
        } catch (error) {
            console.error(`Error in SkuService - updateSku for ID ${skuId}:`, error);
            throw error;
        }
    }

    static async deleteSku(skuId) {
        try {
            await Sku.delete(skuId);
            console.log(`Sku with ID ${skuId} deleted`);
        } catch (error) {
            console.error(`Error in SkuService - deleteSku for ID ${skuId}:`, error);
            throw error;
        }
    }

    static async getSkuByProduct(productId) {
        try {
            const skus = await Sku.getSkyByProduct(productId);
            console.log(`Retrieved skus for product ID ${productId}`);
            return skus;
        } catch (error) {
            console.error(`Error in SkuService - getSkuByProduct for product ID ${productId}:`, error);
            throw error;
        }
    }
}

module.exports = SkuService;
