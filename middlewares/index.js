const { alreadyExists } = require('./alreadyExists');
const { nameValidation } = require('./nameValidation');
const { quantityValidation } = require('./quantityValidation');
const { productIdValidation } = require('./productIdValidation');

module.exports = {
  alreadyExists,
  nameValidation,
  quantityValidation,
  productIdValidation,
};