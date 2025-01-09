const multer = require('multer');
const path = require('path');

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'assets/images/product');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
    // Lưu hình ảnh vào cơ sở dữ liệu sau khi tải lên thành công
    const productId = req.body.productId; // ID của sản phẩm mà bạn muốn gán hình ảnh
    const imageUrl = `/uploads/${req.file.filename}`; // URL hình ảnh trên server

    // Lưu vào bảng image_product
    // Bạn cần thêm logic để lưu vào DB
    // Ví dụ:
    // const query = 'INSERT INTO image_product (product_id, image_url) VALUES (?, ?)';
    // connection.query(query, [productId, imageUrl], (error, results) => {
    //   if (error) throw error;
    //   res.status(200).json({ message: 'Image uploaded successfully!', imageUrl });
    // });

    res.status(200).json({ message: 'Image uploaded successfully!', imageUrl });
});
