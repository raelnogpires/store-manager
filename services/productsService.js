const productsModel = require('../models/productsModel');

const getAll = async () => {
  const result = await productsModel.getAll();
  if (result === undefined || result.length === 0) return false;
  return result;
};

const getById = async (id) => {
  if (id === undefined || typeof id !== 'number') return false;
  const result = await productsModel.getById(id);
  if (result === undefined || result.length === 0) return false;
  return result;
};

const create = async (name, quantity) => {
  const { id } = await productsModel.create(name, quantity);
  return { id };
};

const update = async (id, name, quantity) => {
  const result = await productsModel.update(id, name, quantity);
  return result;
};

module.exports = { getAll, getById, create, update };
