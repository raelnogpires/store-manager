const salesModel = require('../models/salesModel');

const getAll = async () => {
  const result = await salesModel.getAll();
  if (result.length === 0 || result === undefined) return false;
  return result;
};

const getById = async (id) => {
  const result = await salesModel.getById(id);
  if (result.length === 0 || result === undefined) return false;
  return result;
};

module.exports = { getAll, getById };
