// const errorCode = require('../services/errorCode');

const errorMiddleware = async (err, _req, res, _next) => {
  const statusCode = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
  };

  const status = statusCode[err.code] || 500;

  if (status === 500) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }

  return res.status(status).json({ message: err.message });
};

module.exports = { errorMiddleware };
