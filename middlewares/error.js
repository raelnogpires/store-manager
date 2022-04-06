const errorMiddleware = async (err, _req, res, _next) => {
  const status = err.code || 500;

  if (status === 500) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }

  return res.status(status).json({ message: err.message });
};

module.exports = { errorMiddleware };
