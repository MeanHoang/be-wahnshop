const ProductService = require('../../services/product/productService');
const cloudinary = require('../../config/cloudinary');

const createProduct = async (req, res) => {
    try {
        console.log("Request body:", req.body);
        console.log("File uploaded:", req.file);

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded!' });
        }

        // Lấy URL của ảnh từ Cloudinary
        const imageUrl = req.file.path;

        // Dữ liệu sản phẩm từ body request
        const data = { ...req.body, image_url_default: imageUrl };

        // Gọi method tạo sản phẩm từ Model
        const product = await ProductService.createProduct(data);

        res.status(201).json({
            message: 'Tạo sản phẩm thành công!',
            product,
        });
    } catch (error) {
        console.error('Lỗi khi tạo sản phẩm:', error.message);
        if (req.file) {
            await cloudinary.uploader.destroy(req.file.filename);
        }
        res.status(500).json({ message: 'Lỗi Server', error: error.message });
    }
};


const updateProduct = async (req, res) => {
    try {
        const productId = req.body.id;

        console.log("Request body:", req.body);
        console.log("File uploaded:", req.file);

        let updateData = req.body;

        // Kiểm tra xem có ảnh mới được tải lên không
        if (req.file) {
            const imageUrl = req.file.path;
            updateData = { ...req.body, image_url_default: imageUrl };
        }

        await ProductService.updateProduct(productId, updateData);
        res.status(200).json({ message: 'Cập nhật sản phẩm thành công' });

    } catch (error) {
        console.error("Lỗi khi cập nhật sản phẩm:", error);
        res.status(500).json({ message: 'Lỗi Server', error: error.message });
    }
};


const deleteProduct = async (req, res) => {
    try {
        const productId = req.body.id;

        const product = await ProductService.getProductById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        console.log("Check image_url_default:", product.image_url_default);

        if (product.image_url_default) {
            const publicId = extractPublicId(product.image_url_default);
            console.log("Extracted public_id:", publicId);

            if (publicId) {
                const result = await cloudinary.uploader.destroy(publicId, { invalidate: true, resource_type: "image" });
                console.log("Cloudinary delete response:", result);
            }
        } else {
            console.warn("Product does not have an image.");
        }

        await ProductService.deleteProduct(productId);
        console.log(`Product ${productId} deleted from DB`);

        res.status(200).json({ message: "Xóa thành công" });
    } catch (error) {
        console.error("Error in deleteProduct:", error);
        res.status(500).json({ message: "Failed to delete product", error: error.message });
    }
};

const extractPublicId = (imageUrl) => {
    const matches = imageUrl.match(/\/upload\/(?:v\d+\/)?([^/.]+)\./);
    return matches ? matches[1] : null;
};

const getAllProduct = async (req, res) => {
    console.log('Get All Product Request:', req.query);

    const { page = 1, limit = 8, searchTerm = '' } = req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    try {
        const allProducts = await ProductService.getAllProduct();

        // console.log('All Products:', allProducts);

        const filteredProducts = allProducts.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const products = filteredProducts.slice(startIndex, endIndex);
        console.log('Filtered Products:', filteredProducts.length, 'Page:', page, 'Products on Page:', products.length);

        res.json({
            total: filteredProducts.length,
            page,
            products,
        });
    } catch (error) {
        console.error('Error in getAllProduct:', error.message);
        res.status(500).json({ error: error.message });
    }
};



const getProductById = async (req, res) => {
    try {
        const { product_id } = req.query;
        console.log("check res.query:", req.query);
        const product = await ProductService.getProductById(product_id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error("Error in getProductById:", error);
        res.status(500).json({ message: 'Failed to retrieve product', error: error.message });
    }
};

const getProductByCategory = async (req, res) => {
    try {
        const categoryId = req.body.categoryId;
        const products = await ProductService.getProductByCategory(categoryId);
        res.status(200).json(products);
    } catch (error) {
        console.error("Error in getProductByCategory:", error);
        res.status(500).json({ message: 'Failed to retrieve products by category', error: error.message });
    }
};

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getProductById,
    getProductByCategory
};
