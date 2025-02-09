const AtributeOptionService = require("../../services/product/attributeOptionService");

class AttributeOptionController {
    // Tạo một tùy chọn mới
    static async createAttributeOption(req, res) {
        console.log("check res.body: ", req.body);
        const { name, attribute_id, value } = req.body;

        if (!attribute_id || !value) {
            return res.status(400).json({ message: "attribute_id và value là bắt buộc!" });
        }

        try {
            const newOption = await AtributeOptionService.createAtributeOption({ name, attribute_id, value });
            return res.status(201).json({
                message: "Tùy chọn đã được tạo thành công!",
                data: newOption,
            });
        } catch (error) {
            console.error("Controller Error:", error);
            return res.status(500).json({ message: "Đã xảy ra lỗi khi tạo tùy chọn." });
        }
    }

    // Lấy tất cả các tùy chọn
    static async getAllAttributeOptions(req, res) {
        try {
            const options = await AtributeOptionService.getAllAtributeOption();
            return res.status(200).json({ attributeOptions: options });
        } catch (error) {
            console.error("Controller Error:", error);
            return res.status(500).json({ message: "Không thể lấy dữ liệu tùy chọn." });
        }
    }

    // Cập nhật tùy chọn theo ID
    static async updateAttributeOption(req, res) {
        const { id } = req.body;
        const updateData = req.body;

        if (!updateData || Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: "Dữ liệu cập nhật không được để trống!" });
        }

        try {
            const updatedOption = await AtributeOptionService.updateAttributeOption(id, updateData);
            return res.status(200).json({
                message: "Tùy chọn đã được cập nhật thành công!",
                data: updatedOption,
            });
        } catch (error) {
            console.error("Controller Error:", error);
            return res.status(500).json({ message: "Không thể cập nhật tùy chọn." });
        }
    }

    // Xóa tùy chọn theo ID
    static async deleteAttributeOption(req, res) {
        const { id } = req.body;

        try {
            await AtributeOptionService.deleteAttributeOption(id);
            return res.status(200).json({ message: "Tùy chọn đã được xóa thành công!" });
        } catch (error) {
            console.error("Controller Error:", error);
            return res.status(500).json({ message: "Không thể xóa tùy chọn." });
        }
    }

    // Tìm tùy chọn theo ID thuộc tính
    static async findAttributeOptionByAttributeId(req, res) {
        console.log("check req.query: ", req.query);
        const { attribute_id } = req.query;
        console.log("check attribute_id: ", attribute_id);

        try {
            const options = await AtributeOptionService.findAttributeOptionByAttributeId(attribute_id);
            return res.status(200).json({ attributeOptions: options });
        } catch (error) {
            console.error("Controller Error:", error);
            return res.status(500).json({ message: "Không thể tìm thấy tùy chọn theo attribute_id." });
        }
    }

    // Tìm tùy chọn theo ID
    static async findAttributeOptionById(req, res) {
        const { id } = req.body;
        console.log("check req.body: ", req.body);
        try {
            const attributeOption = await AtributeOptionService.findAttributeOptionById(id);
            if (!attributeOption) {
                return res.status(404).json({ message: "Không tìm thấy tùy chọn với ID đã cung cấp." });
            }

            return res.status(200).json({ attributeOption });
        } catch (error) {
            console.error("Controller Error:", error);
            return res.status(500).json({ message: "Không thể tìm thấy tùy chọn theo ID." });
        }
    }

}

module.exports = AttributeOptionController;
