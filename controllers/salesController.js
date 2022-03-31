const salesService = require('../services/salesService');

const HTTP_OK = 200;
const INTERNAL_ERROR = 500;
const NOT_FOUND = 404;
const CREATED = 201;

const getAll = async (_req, res) => {
  const result = await salesService.getAll();

  if (!result) {
    return res.status(INTERNAL_ERROR).json({ message: 'Server internal error' });
  }

  return res.status(HTTP_OK).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const result = await salesService.getById(id);

  if (!result) {
    return res.status(NOT_FOUND).json({ message: 'Sale not found' });
  }

  return res.status(HTTP_OK).json(result);
};

const create = async (req, res) => {
  const result = await salesService.create(req.body);

  return res.status(CREATED).json(result);
};

module.exports = { getAll, getById, create };