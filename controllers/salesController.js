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

// const update = async (req, res) => {
//   const { id } = req.params;
//   const { productId, quantity } = req.body;

//   await salesService.update(id, productId, quantity);

//   return res.status(statusCode.HTTP_OK).json({ saleId: id, itemUpdated: [productId, quantity] });
// };

// const deleteById = async (req, res, next) => {
//   const { id } = req.params;

//   const result = await salesService.deleteById(id);

//   if (result.error) {
//     return next(result.error);
//   }

//   return res.status(statusCode.NO_CONTENT).end();
// };

module.exports = {
  getAll,
  getById,
  create,
  // update,
  // deleteById,
};