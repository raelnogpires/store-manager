const productsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const result = await productsModel.getById(id);

  if (!result) {
    return {
      error: {
        code: 404,
        message: 'Product not found',
      },
    };
  }

  return { product: result };
};

// const create = async (name, quantity) => {
//   const product = await productsModel.getByName(name);

//   if (product.length >= 1) {
//     return {
//       error: {
//         code: errorCode.CONFLICT,
//         message: 'Product already exists',
//       },
//     };
//   }

//   const { id } = await productsModel.create(name, quantity);

//   return { id };
// };

// const update = async (id, name, quantity) => {
//   const product = await productsModel.getById(id);

//   if (product === undefined || !product) {
//     return {
//       error: {
//         code: errorCode.NOT_FOUND,
//         message: 'Product not found',
//       },
//     };
//   }

//   const result = await productsModel.update(id, name, quantity);

//   return result;
// };

// const deleteById = async (id) => {
//   const product = await productsModel.getById(id);

//   if (product === undefined || !product) {
//     return {
//       error: {
//         code: errorCode.NOT_FOUND,
//         message: 'Product not found',
//       },
//     };
//   }

//   const result = await productsModel.deleteById(id);

//   return result;
// };

module.exports = {
  getAll,
  getById,
  // create,
  // update,
  // deleteById,
};
