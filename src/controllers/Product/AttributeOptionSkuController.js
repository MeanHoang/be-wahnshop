const AttributeOptionSkuService = require('../../services/product/attributeOptionSkuService');

const create = async (req, res) => {
    try {
        const data = req.body;
        const result = await AttributeOptionSkuService.createAttributeOptionSku(data);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const update = async (req, res) => {
    try {
        const { skuId } = req.params;
        const updateData = req.body;
        const result = await AttributeOptionSkuService.updateAttributeOptionSku(skuId, updateData);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const remove = async (req, res) => {
    try {
        const { skuId, attributeOptionId } = req.params;
        await AttributeOptionSkuService.deleteAttributeOptionSku(skuId, attributeOptionId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAll = async (req, res) => {
    try {
        const result = await AttributeOptionSkuService.getAllAttributeOptionSkus();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getById = async (req, res) => {
    try {
        const { skuId } = req.params;
        const result = await AttributeOptionSkuService.getAttributeOptionSkuById(skuId);
        if (!result) {
            return res.status(404).json({ error: 'Not found' });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    create,
    update,
    remove,
    getAll,
    getById
};
