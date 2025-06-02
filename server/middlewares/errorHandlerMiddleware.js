const ApiError = require("../utils/ApiError");

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      isOperational: err.isOperational,
    });
  }
  console.log(`Error: ${err.stack}`);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    isOperational: false,
  });
};

module.exports = errorHandler;
