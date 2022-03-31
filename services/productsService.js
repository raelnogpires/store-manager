const productsModel = require('../models/productsModel');

const getAll = async () => {
  const result = await productsModel.getAll();
  if (result === undefined || result.length === 0) return false;
  return result;
};

const getById = async (id) => {
  const result = await productsModel.getById(id);
  if (id === undefined || typeof id !== 'number') return false;
  if (result === undefined || result.length === 0) return false;
  return result;
};

const create = async (name, quantity) => {
  const { id } = await productsModel.create(name, quantity);
  return { id };
};

module.exports = { getAll, getById, create };
