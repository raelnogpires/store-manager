const productIdValidation = (id) => {
  if (!id) {
    return {
      error: {
        code: 400,
        message: '"productId" is required',
      },
    };
  }

  return true;
};

const quantityValidation = (quantity) => {
  if (!quantity) {
    return {
      error: {
        code: 400,
        message: '"quantity" is required',
      },
    };
  }

  if (quantity <= 0 || !Number.isInteger(quantity)) {
    return {
      error: {
        code: 422,
        message: '"quantity" must be greater than or equal to 1',
      },
    };
  }

  return true;
};

const saleValidation = async (req, _res, next) => {
  const [{ productId, quantity }] = req.body;

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

module.exports = saleValidation;