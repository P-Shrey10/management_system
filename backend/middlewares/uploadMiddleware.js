const multer = require('multer');
const path = require('path');

// Define storage for different file types
const storage = {
  products: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/products');
    },
    filename: (req, file, cb) => {
      cb(null, `product-${Date.now()}${path.extname(file.originalname)}`);
    }
  }),
  
  users: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/users');
    },
    filename: (req, file, cb) => {
      cb(null, `user-${req.user.id}${path.extname(file.originalname)}`);
    }
  }),
  
  categories: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/categories');
    },
    filename: (req, file, cb) => {
      cb(null, `category-${Date.now()}${path.extname(file.originalname)}`);
    }
  })
};

// Check file type
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  
  if (mimetype && extname) {
    return cb(null, true);
  }
  
  cb(new Error('Only image files are allowed!'));
};

// Create upload middleware for different purposes
exports.uploadProductImage = multer({
  storage: storage.products,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
  fileFilter
}).single('image');

exports.uploadUserImage = multer({
  storage: storage.users,
  limits: { fileSize: 1024 * 1024 * 2 }, // 2MB
  fileFilter
}).single('image');

exports.uploadCategoryImage = multer({
  storage: storage.categories,
  limits: { fileSize: 1024 * 1024 * 2 }, // 2MB
  fileFilter
}).single('image');

// Middleware to handle upload errors
exports.handleUploadError = (req, res, next) => {
  return (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'File is too large'
        });
      }
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    
    next();
  };
};