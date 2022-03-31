const express = require('express');
const productsController = require('../controllers/productsController');
const salesController = require('../controllers/salesController');

const router = express.Router();

router
  .get('/products', productsController.getAll)
  .get('/products/:id', productsController.getById)
  .get('/sales', salesController.getAll)
  .get('/sales/:id', salesController.getById);

module.exports = router;