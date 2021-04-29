import ErrorResponse from '../utils/errorResponseClass';

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  // Error message without a conditional block
  error.message = err.message;

  //log to console for the dev
  // console.log(err);

  // Conditional statement to handle Mongoose bad Object ID error
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Conditional statement to handle Mongoose Duplicate key error
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }

  // Conditional statement to handle Mongoose Validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }
  
  // Final output
  res.status(error.status || 500).json({
    status: error.status || 500,
    success: false,
    error: error.message || 'Server Error',
  });
};

export default errorHandler;
