class AppError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'clientError' : 'serverError';
        this.isOperational = true;
  
        Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = AppError;