const errorCode = require('../services/errorCode');

const productIdValidation = (id) => {
  if (id === undefined || !id) {
    return {
      error: {
        code: errorCode.BAD_REQUEST,
        message: '"productId" is required',
      },
    };
  }

  return true;
};

const quantityValidation = (quantity) => {
  if (quantity === undefined || !quantity) {
    return {
      error: {
        code: errorCode.BAD_REQUEST,
        message: '"quantity" is required',
      },
    };
  }

  if (quantity <= 0 || !Number.isInteger(quantity)) {
    return {
      error: {
        code: errorCode.UNPROCESSABLE_ENTITY,
        message: '"quantity" must be greater than or equal to 1',
      },
    };
  }

  return true;
};

const saleValidation = async (req, res, next) => {
  const { productId, quantity } = req.body;

  const validateProductId = productIdValidation(productId);
  const validateQuantity = quantityValidation(quantity);

  if (validateProductId.error) {
    return next(validateProductId.error);
  }

  if (validateQuantity.error) {
    return next(validateQuantity.error);
  }

  next();
};

module.exports = { saleValidation };