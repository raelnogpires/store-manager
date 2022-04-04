const errorCode = require('../services/errorCode');

const statusCode = {
  [errorCode.BAD_REQUEST]: 400,
  [errorCode.NOT_FOUND]: 404,
  [errorCode.CONFLICT]: 409,
  [errorCode.UNPROCESSABLE_ENTITY]: 422,
};

const errorMiddleware = async (err, _req, res, _next) => {
  const status = statusCode[err.code] || 500;

  if (status === 500) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }

  return res.status(status).json({ message: err.message });
};

module.exports = { errorMiddleware };
