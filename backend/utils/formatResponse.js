/**
 * Utility to format consistent API responses
 */

/**
 * Format a successful API response
 * @param {Object} data - The data to return
 * @param {String} message - Optional success message
 * @param {Number} statusCode - HTTP status code (default: 200)
 */
const success = (data = {}, message = 'Success', statusCode = 200) => {
    return {
      success: true,
      message,
      data,
      statusCode
    };
  };
  
  /**
   * Format an error API response
   * @param {String} message - Error message
   * @param {Number} statusCode - HTTP status code (default: 400)
   * @param {Object} errors - Optional validation errors
   */
  const error = (message = 'Error occurred', statusCode = 400, errors = null) => {
    return {
      success: false,
      message,
      errors,
      statusCode
    };
  };
  
  module.exports = {
    success,
    error
  };