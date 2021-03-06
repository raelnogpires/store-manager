const salesService = require('../services/salesService');
const statusCode = require('./statusCode');

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();
  return res.status(statusCode.HTTP_OK).json(sales);
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  const { sale, error } = await salesService.getById(id);

  if (error) {
    return next(error);
  }

  return res.status(statusCode.HTTP_OK).json(sale);
};

const create = async (req, res) => {
  const result = await salesService.create(req.body);
  return res.status(statusCode.CREATED).json(result);
};

const update = async (req, res) => {
  const { id } = req.params;

  const result = await salesService.update(id, req.body);

  return res.status(statusCode.HTTP_OK).json(result);
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;

  const { error } = await salesService.deleteById(id);

  if (error) {
    return next(error);
  }

  return res.status(statusCode.NO_CONTENT).end();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};