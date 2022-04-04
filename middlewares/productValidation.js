const errorCode = require('../services/errorCode');

const nameValidation = (name) => {
  if (name === undefined || !name) {
    return {
      error: {
        code: errorCode.BAD_REQUEST,
        message: '"name" is required',
      },
    };
  }

  if (name.length < 5) {
    return {
      error: {
        code: errorCode.UNPROCESSABLE_ENTITY,
        message: '"name" is required',
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

module.exports = { productValidation };