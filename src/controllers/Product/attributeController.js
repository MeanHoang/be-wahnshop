const AttributeService = require('../../services/product/attributeService');

const createAttribute = async (req, res) => {
    console.log("Entering createAttribute with data:", req.body);
    try {
        const attributeData = req.body;
        const attributeId = await AttributeService.createAttribute(attributeData);
        console.log("Attribute created successfully with ID:", attributeId);
        res.status(201).json({ message: 'Attribute created successfully', attributeId });
    } catch (error) {
        console.error("Error in createAttribute:", error);
        res.status(500).json({ message: 'Failed to create attribute' });
    }
};

const getAllAttributes = async (req, res) => {
    try {
        const allAttributes = await AttributeService.getAllAttribute();

        res.status(200).json({
            attributes: allAttributes
        });

    } catch (error) {
        console.error("Error in getAllAttributes:", error);
        res.status(500).json({ message: 'Failed to retrieve getAllAttributes' });
    }
};

const updateAttribute = async (req, res) => {
    console.log("Entering updateAttribute with ID:", req.params.id, "and data:", req.body);
    try {
        const attributeId = req.body.id;
        const updateData = req.body;
        await AttributeService.updateAttribute(attributeId, updateData);
        console.log("Attribute updated successfully for ID:", attributeId);
        res.status(200).json({ message: 'Attribute updated successfully' });
    } catch (error) {
        console.error("Error in updateAttribute:", error);
        res.status(500).json({ message: 'Failed to update attribute' });
    }
};

const deleteAttribute = async (req, res) => {
    console.log("Entering deleteAttribute with ID:", req.params.id);
    try {
        const attributeId = req.body.id;
        await AttributeService.deleteAttribute(attributeId);
        console.log("Attribute deleted successfully for ID:", attributeId);
        res.status(200).json({ message: 'Attribute deleted successfully' });
    } catch (error) {
        console.error("Error in deleteAttribute:", error);
        res.status(500).json({ message: 'Failed to delete attribute' });
    }
};

const getAttributeById = async (req, res) => {
    console.log("Entering getAttributeById with ID:", req.body.id);
    try {
        const attributeId = req.body.id;
        const attribute = await AttributeService.findAttributeById(attributeId);
        if (attribute) {
            console.log("Attribute found:", attribute);
            res.status(200).json(attribute);
        } else {
            console.log("Attribute not found for ID:", attributeId);
            res.status(404).json({ message: 'Attribute not found' });
        }
    } catch (error) {
        console.error("Error in getAttributeById:", error);
        res.status(500).json({ message: 'Failed to retrieve attribute' });
    }
};

module.exports = {
    createAttribute,
    getAllAttributes,
    updateAttribute,
    deleteAttribute,
    getAttributeById
};
