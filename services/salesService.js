const salesModel = require('../models/salesModel');

const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

const getById = async (id) => {
  const result = await salesModel.getById(id);

  if (!result) {
    return {
      error: {
        code: 404,
        message: 'Sale not found',
      },
    };
  }

  return { sale: result };
};

const create = async (products) => {
  const result = await salesModel.create(products);
  return result;
};

const update = async (id, products) => {
  const result = await salesModel.update(id, products);
  return result;
};

// const deleteById = async (id) => {
//   const sale = await salesModel.getById(id);

//   if (sale === undefined || !sale) {
//     return {
//       error: {
//         code: errorCode.NOT_FOUND,
//         message: 'Sale not found',
//       },
//     };
//   }

//   const result = await salesModel.deleteById(id);

//   return result;
// };

module.exports = {
  getAll,
  getById,
  create,
  update,
  // deleteById,
};
