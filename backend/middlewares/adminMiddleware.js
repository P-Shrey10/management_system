const User = require('../models/userModel');

/**
 * Middleware to check if user has admin role
 * Must be used after authMiddleware.protect
 */
exports.isAdmin = async (req, res, next) => {
  try {
    // User is already attached to req by authMiddleware.protect
    const user = await User.findById(req.user.id);
    
    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized as admin'
      });
    }
    
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};