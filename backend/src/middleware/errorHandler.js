/**
 * Typed operational error that carries an HTTP status code.
 * Controllers throw this; the global error handler catches it.
 */
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Global Express error-handling middleware.
 * Must be registered last in app.js (4-arg signature).
 */
function errorHandler(err, req, res, next) {
  // Mongoose CastError - e.g. invalid ObjectId format
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid value for field "' + err.path + '": ' + err.value,
    });
  }

  // Mongoose ValidationError - missing required fields etc.
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors: messages,
    });
  }

  // Our own AppError
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Unexpected errors - do not leak internals
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
}

module.exports = { AppError, errorHandler };