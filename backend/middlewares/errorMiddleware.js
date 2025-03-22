/**
 * Custom error handler middleware
 * This handles errors and returns a standardized response format
 */
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    res.status(statusCode);
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
      success: false
    });
  };
  
  /**
   * Not found middleware
   * This handles 404 errors for routes that don't exist
   */
  const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
  
  module.exports = { errorHandler, notFound };