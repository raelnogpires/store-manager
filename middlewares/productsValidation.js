const productsModel = require('../models/productsModel');

const BAD_REQUEST = 400;
const UNPROCESSABLE_ENTITY = 422;
const CONFLICT = 409;

const nameExist = (name) => {
  if (name === undefined || typeof name !== 'string' || name.length === 0) {
    return false;
  }
  return true;
};

const nameLength = (name) => {
  if (name.length < 5) return false;
  return true;
};

const nameValidation = async (req, res, next) => {
  const { name } = req.body;

  if (!nameExist(name)) {
    return res.status(BAD_REQUEST).json({ message: '"name" is required' });
  }

  if (!nameLength(name)) {
    return res.status(UNPROCESSABLE_ENTITY).json(
      { message: '"name" length must be at least 5 characters long' },
    );
  }

  next();
};

const quantityExist = (quantity) => {
  if (quantity === undefined || typeof quantity !== 'number') return false;
  return true;
};

const quantityValid = (quantity) => {
  if (quantity <= 0 || !Number.isInteger(quantity)) return false;
  return true;
};

const quantityValidation = async (req, res, next) => {
  const { quantity } = req.body;

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

const alreadyExists = async (req, res, next) => {
  const { name } = req.body;

  const product = await productsModel.getByName(name);

  if (product.length >= 1) {
    return res.status(CONFLICT).json({ message: 'Product already exists' });
  }

  next();
};

module.exports = {
  nameValidation,
  quantityValidation,
  alreadyExists,
};
