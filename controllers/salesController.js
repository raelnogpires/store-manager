const salesService = require('../services/salesService');
const statusCode = require('./statusCode');

const getAll = async (_req, res) => {
  const result = await salesService.getAll();
  return res.status(statusCode.HTTP_OK).json(result);
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  const result = await salesService.getById(id);

  if (result.error) {
    return next(result.error);
  }

  return res.status(statusCode.HTTP_OK).json(result);
};

const create = async (req, res) => {
  const result = await salesService.create(req.body);
  return res.status(statusCode.CREATED).json(result);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { productId, quantity } = req.body;

  await salesService.update(id, productId, quantity);

  return res.status(statusCode.HTTP_OK).json({ saleId: id, itemUpdated: [productId, quantity] });
};

module.exports = { getAll, getById, create, update };