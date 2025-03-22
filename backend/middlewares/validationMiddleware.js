/**
 * Middleware for validating API requests
 * @param {Object} schema - Joi validation schema
 */
const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      return res.status(400).json({ 
        success: false,
        message: 'Validation failed',
        errors: error.details.map(detail => ({
          field: detail.path[0],
          message: detail.message
        }))
      });
    }
    
    next();
  };
  
  module.exports = { validate };
  
  // Note: This requires the Joi library - install with: npm install joi