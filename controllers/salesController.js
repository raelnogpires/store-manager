const salesService = require('../services/salesService');

const HTTP_OK = 200;
const INTERNAL_ERROR = 500;
const NOT_FOUND = 404;

const getAll = async (_req, res) => {
  const result = await salesService.getAll();

  if (!result) {
    return res.status(INTERNAL_ERROR).json({ message: 'Erro no Servidor' });
  }

  return res.status(HTTP_OK).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const result = await salesService.getById(id);

  if (!result) {
    return res.status(NOT_FOUND).json({ message: 'Venda não encontrada' });
  }

  return res.status(HTTP_OK).json(result);
};

module.exports = { getAll, getById };