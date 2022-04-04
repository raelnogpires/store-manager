const productsService = require('../services/productsService');
const statusCode = require('./statusCode');

const getAll = async (_req, res) => {
  const result = await productsService.getAll();
  return res.status(statusCode.HTTP_OK).json(result);
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  const result = await productsService.getById(id);

  if (result.error) {
    return next(result.error);
  }

  return res.status(statusCode.HTTP_OK).json(...result);
};

const create = async (req, res, next) => {
  const { name, quantity } = req.body;

  const result = await productsService.create(name, quantity);

  if (result.error) {
    return next(result.error);
  }

  return res.status(statusCode.CREATED).json({ id: result.id, name, quantity });
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const result = await productsService.update(id, name, quantity);

  if (result.error) {
    return next(result.error);
  }

  return res.status(statusCode.HTTP_OK).json({ id, name, quantity });
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;

  const result = await productsService.deleteById(id);

  if (result.error) {
    return next(result.error);
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