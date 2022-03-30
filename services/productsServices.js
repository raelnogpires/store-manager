const productsModel = require('../models/productsModel');

const getAll = async () => {
  const result = await productsModel.getAll();
  if (result.length === 0 || result === undefined) return false;
  return result;
};

const getById = async (id) => {
  const result = await productsModel.getById(id);
  if (result.length === 0 || result === undefined) return false;
  return result;
};

module.exports = { getAll, getById };
