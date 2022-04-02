const BAD_REQUEST = 400;
const UNPROCESSABLE_ENTITY = 422;

const quantityExist = async (req, res, next) => {
  const { quantity } = req.body;

  if (quantity === undefined || !quantity) {
    return res.status(BAD_REQUEST).json({ message: '"quantity" is required' });
  }

  next();
};

const quantityValid = async (req, res, next) => {
  const { quantity } = req.body;

  if (quantity <= 0 || !Number.isInteger(quantity)) {
    return res.status(UNPROCESSABLE_ENTITY).json(
      { message: '"quantity" must be greater than or equal to 1' },
    );
  }

  next();
};

const quantityValidation = [quantityExist, quantityValid];

module.exports = { quantityValidation };
