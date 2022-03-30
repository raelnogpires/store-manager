const productsModel = require('../models/productsModel');

const HTTP_OK = 200;
const INTERNAL_ERROR = 500;

const getAll = async (_req, res) => {
  try {
    const products = await productsModel.getAll();
    return res.status(HTTP_OK).json(products);
  } catch (error) {
    return res.status(INTERNAL_ERROR).json({ message: 'Erro no servidor' });
  }
};

module.exports = { getAll };