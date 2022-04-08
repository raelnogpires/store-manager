const productsService = require('../services/productsService');
const statusCode = require('./statusCode');

const getAll = async (_req, res) => {
  const products = await productsService.getAll();
  return res.status(statusCode.HTTP_OK).json(products);
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  const { product, error } = await productsService.getById(id);

  if (error) {
    return next(error);
  }

  return res.status(statusCode.HTTP_OK).json(product);
};

const create = async (req, res, next) => {
  const { name, quantity } = req.body;

  const { id, error } = await productsService.create(name, quantity);

  if (error) {
    return next(error);
  }

  return res.status(statusCode.CREATED).json({ id, name, quantity });
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const { product, error } = await productsService.update(id, name, quantity);

  if (error) {
    return next(error);
  }

  return res.status(statusCode.HTTP_OK).json(product);
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;

  const { error } = await productsService.deleteById(id);

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