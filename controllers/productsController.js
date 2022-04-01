const productsService = require('../services/productsService');

const HTTP_OK = 200;
const INTERNAL_ERROR = 500;
const NOT_FOUND = 404;
const CREATED = 201;

const getAll = async (_req, res) => {
  const result = await productsService.getAll();

  if (!result) {
    return res.status(INTERNAL_ERROR).json({ message: 'Erro no Servidor' });
  }

  return res.status(HTTP_OK).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const result = await productsService.getById(id);

  if (!result) {
    return res.status(NOT_FOUND).json({ message: 'Product not found' });
  }

  return res.status(HTTP_OK).json(...result);
};

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const { id } = await productsService.create(name, quantity);

  return res.status(CREATED).json({ id, name, quantity });
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = await productsService.update(id, name, quantity);

  if (!product) {
    return res.status(NOT_FOUND).json({ message: 'Product not found' });
  }

  return res.status(HTTP_OK).json({ id, name, quantity });
};

module.exports = { getAll, getById, create, update };