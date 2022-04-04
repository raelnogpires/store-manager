const salesModel = require('../models/salesModel');
const errorCode = require('../middlewares/error');

const getAll = async () => {
  const result = await salesModel.getAll();
  return result;
};

const getById = async (id) => {
  const result = await salesModel.getById(id);

  if (result === undefined || !result) {
    return {
      error: {
        code: errorCode.NOT_FOUND,
        message: 'Sale not found',
      },
    };
  }

  return result;
};

const create = async (products) => {
  const result = await salesModel.create(products);
  return result;
};

const update = async (id, productId, quantity) => {
  const result = await salesModel.update(id, productId, quantity);
  return result;
};

module.exports = { getAll, getById, create, update };
