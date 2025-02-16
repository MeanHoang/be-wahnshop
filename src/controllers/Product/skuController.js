const SkuService = require('../../services/product/skuService');
const cloudinary = require('../../config/cloudinary');

const createSku = async (req, res) => {
    try {
        console.log("Request body:", req.body);
        console.log("File uploaded:", req.file);

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded!' });
        }

        // Lấy URL của ảnh từ Cloudinary
        const imageUrl = req.file.path;

        // Dữ liệu Sku từ body request
        const data = { ...req.body, image_url_default: imageUrl };

        // Gọi method tạo Sku từ Model
        const sku = await SkuService.createSku(data);

        res.status(201).json({
            message: 'Tạo Sku thành công!',
            sku,
        });
    } catch (error) {
        console.error('Lỗi khi tạo Sku:', error.message);
        if (req.file) {
            await cloudinary.uploader.destroy(req.file.filename);
        }
        res.status(500).json({ message: 'Lỗi Server', error: error.message });
    }
};


const updateSku = async (req, res) => {
    try {
        const skuId = req.body.id;

        console.log("Request body:", req.body);
        console.log("File uploaded:", req.file);

        let updateData = req.body;

        // Kiểm tra xem có ảnh mới được tải lên không
        if (req.file) {
            const imageUrl = req.file.path;
            updateData = { ...req.body, image_url_default: imageUrl };
        }

        await SkuService.updateSku(skuId, updateData);
        res.status(200).json({ message: 'Cập nhật Sku thành công' });

    } catch (error) {
        console.error("Lỗi khi cập nhật Sku:", error);
        res.status(500).json({ message: 'Lỗi Server', error: error.message });
    }
};


const deleteSku = async (req, res) => {
    try {
        const skuId = req.body.id;

        const sku = await SkuService.getSkuById(skuId);
        if (!sku) {
            return res.status(404).json({ message: "Sku not found" });
        }

        console.log("Check image_url_default:", sku.image_url_default);

        if (sku.image_url_default) {
            const publicId = extractPublicId(sku.image_url_default);
            console.log("Extracted public_id:", publicId);

            if (publicId) {
                const result = await cloudinary.uploader.destroy(publicId, { invalidate: true, resource_type: "image" });
                console.log("Cloudinary delete response:", result);
            }
        } else {
            console.warn("Sku does not have an image.");
        }

        await SkuService.deleteSku(skuId);
        console.log(`Sku ${skuId} deleted from DB`);

        res.status(200).json({ message: "Xóa thành công" });
    } catch (error) {
        console.error("Error in deleteSku:", error);
        res.status(500).json({ message: "Failed to delete sku", error: error.message });
    }
};

const extractPublicId = (imageUrl) => {
    const matches = imageUrl.match(/\/upload\/(?:v\d+\/)?([^/.]+)\./);
    return matches ? matches[1] : null;
};

const getAllSku = async (req, res) => {
    console.log('Get All Sku Request:', req.query);

    const { page = 1, limit = 8, searchTerm = '' } = req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    try {
        const allSkus = await SkuService.getAllSku();

        // console.log('All Skus:', allSkus);

        const filteredSkus = allSkus.filter((sku) =>
            sku.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const skus = filteredSkus.slice(startIndex, endIndex);
        console.log('Filtered Skus:', filteredSkus.length, 'Page:', page, 'Skus on Page:', skus.length);

        res.json({
            total: filteredSkus.length,
            page,
            skus,
        });
    } catch (error) {
        console.error('Error in getAllSku:', error.message);
        res.status(500).json({ error: error.message });
    }
};

const getSkuById = async (req, res) => {
    try {
        const { sku_id } = req.query;
        console.log("check res.query:", req.query);
        const sku = await SkuService.getSkuById(sku_id);
        if (sku) {
            res.status(200).json(sku);
        } else {
            res.status(404).json({ message: 'Sku not found' });
        }
    } catch (error) {
        console.error("Error in getSkuById:", error);
        res.status(500).json({ message: 'Failed to retrieve sku', error: error.message });
    }
};

const getSkuByProduct = async (req, res) => {
    try {
        const productId = req.query.product_id;

        console.log("check product Id: ", productId);
        const skus = await SkuService.getSkuByProduct(productId);
        res.status(200).json(skus);
    } catch (error) {
        console.error("Error in getSkuBySku:", error);
        res.status(500).json({ message: 'Failed to retrieve skus by category', error: error.message });
    }
};

module.exports = {
    createSku,
    updateSku,
    deleteSku,
    getAllSku,
    getSkuById,
    getSkuByProduct
};
