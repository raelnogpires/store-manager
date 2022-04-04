const express = require('express');
const rescue = require('express-rescue');
const productsController = require('../controllers/productsController');
const { productValidation } = require('../middlewares/productValidation');

const router = express.Router();

router
  .get('/products', rescue(productsController.getAll))
  .get('/products/:id', rescue(productsController.getById))
  .post('/products', productValidation, rescue(productsController.create))
  .put('/products/:id', productValidation, rescue(productsController.update))
  .delete('/products/:id', productsController.deleteById);
  // .get('/sales', salesController.getAll)
  // .get('/sales/:id', salesController.getById)
  // .post('/sales',
  //   productIdValidation,
  //   ...quantityValidation,
  //   salesController.create)
  // .put('/sales/:id',
  //   productIdValidation,
  //   ...quantityValidation,
  //  salesController.update);

module.exports = router;