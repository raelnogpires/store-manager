const productsModel = require('../models/productsModel');

const CONFLICT = 409;

const alreadyExists = async (req, res, next) => {
  const { name } = req.body;

  const product = await productsModel.getByName(name);

  if (product.length >= 1) {
    return res.status(CONFLICT).json({ message: 'Product already exists' });
  }

  next();
};

module.exports = {
  alreadyExists,
};
