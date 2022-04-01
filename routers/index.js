const express = require('express');
const productsController = require('../controllers/productsController');
const salesController = require('../controllers/salesController');
const {
  nameValidation,
  quantityValidation,
  alreadyExists,
} = require('../middlewares/productsValidation');

const router = express.Router();

router
  .get('/products', productsController.getAll)
  .get('/products/:id', productsController.getById)
  .post('/products',
    nameValidation,
    quantityValidation,
    alreadyExists,
    productsController.create)
  .put('/products/:id',
    nameValidation,
    quantityValidation,
    productsController.update)
  .delete('/products/:id', productsController.deleteById)
  .get('/sales', salesController.getAll)
  .get('/sales/:id', salesController.getById)
  .post('/sales', salesController.create);

module.exports = router;