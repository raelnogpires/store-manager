const BAD_REQUEST = 400;

const productIdValidation = async (req, res, next) => {
  const { productId } = req.body;

  if (productId === undefined || !productId) {
    return res.status(BAD_REQUEST).json({ message: '"productId" is required' });
  }

  next();
};

module.exports = { productIdValidation };