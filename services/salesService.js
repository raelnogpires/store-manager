const salesModel = require('../models/salesModel');

const getAll = async () => {
  const result = await salesModel.getAll();
  if (result === undefined || result.length === 0) return false;
  return result;
};

const getById = async (id) => {
  const result = await salesModel.getById(id);
  if (result === undefined || result.length === 0) return false;
  return result;
};

module.exports = { getAll, getById };
