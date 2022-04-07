const nameValidation = (name) => {
  if (!name) {
    return {
      error: {
        code: 400,
        message: '"name" is required',
      },
    };
  }

  if (name.length < 5) {
    return {
      error: {
        code: 422,
        message: '"name" length must be at least 5 characters long',
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

const productValidation = async (req, _res, next) => {
  const { name, quantity } = req.body;

  const validateName = nameValidation(name);
  const validateQuantity = quantityValidation(quantity);

  if (validateName.error) {
    return next(validateName.error);
  }

  if (validateQuantity.error) {
    return next(validateQuantity.error);
  }

  next();
};

module.exports = productValidation;