const BAD_REQUEST = 400;
const UNPROCESSABLE_ENTITY = 422;

const productIdCheck = (id) => {
  if (id === undefined || typeof id !== 'number') return false;
  return true;
};

const quantityExist = (quantity) => {
  if (quantity === undefined || typeof quantity !== 'number') return false;
  return true;
};

const quantityValid = (quantity) => {
  if (quantity <= 0 || !Number.isInteger(quantity)) return false;
  return true;
};

const registerSale = async (req, res, next) => {
  const { productId, quantity } = req.body;

  if (!productIdCheck(productId)) {
    return res.status(BAD_REQUEST).json({ message: '"productId" is required' });
  }

  if (!quantityExist(quantity)) {
    return res.status(BAD_REQUEST).json({ message: '"quantity" is required' });
  }

  if (!quantityValid(quantity)) {
    return res.status(UNPROCESSABLE_ENTITY).json(
      { message: '"quantity" must be greater than or equal to 1' },
    );
  }

  next();
};

module.exports = { registerSale };